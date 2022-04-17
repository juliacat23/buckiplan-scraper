import writer
import logging

"""
Code adapted from @NSegal/FSUCourseScraper
https://github.com/NSegal/FSUCourseScraper/blob/master/scraper.py
"""

class Scraper(object):
    """ scraper class """

    def __init__(self, session, job):
        """ Store the session to use and the scrape job to perform """

        self.session = session
        self.job = job

    def start(self):
        """ Starts running the scrape outlined in the job"""
        
        logging.info(f'Starting job: {0}'.format(self.job))

        try:
            self.scrape_letters()
        except Exception as e:
            logging.debug(e)
            self.session.parser1.dump_html()
            raise
    
    def scrape_letters(self):
        """ Scrape all the letters """

        for letter in self.job('letters'):
            self.session.select_alphanum(letter)
            self.scrape_subjects()

    def scrape_subjects(self):
        """ Scrape subjects/department codes """

        start = self.job("subject_start")
        end = self.job("subject_end")
        step = self.job("subject_step")

        # get a list of all subjects to iterate over
        all_subjects = self.session.parser1.all_subjects(start=start, end=end, step=step)

        # iterate over all subjects
        for subject in all_subjects:
            logging.info(u"--Subject: {abbreviation} - {title}".format(**subject))
            writer.write_subject(subject)
            self.session.dropdown_subject(subject["_unique"])
            self.scrape_courses(subject)
            self.session.rollup_subject(subject["_unique"])
    
    def scrape_courses(self, subject):
        """ Scrape courses """

        start = self.job["course_start"]
        end = self.job["course_end"]

        # get a list of courses to iterate over
        all_courses = self.session.parser1.all_courses(start=start, end=end)

        # iterate over courses
        for course_unique in all_courses:
            self.session.open_course(course_unique)

            course_attrs = self.session.parser1.course_attrs()
            course_attrs['basic']['subject'] = subject['abbreviation']

            logging.info(u"----Course: {number} - {title}".format(**course_attrs['basic']))

            writer.write_course(course_attrs)

            try: 
                self.session.show_sections()
            except Exception as e:
                logging.error("Crashed when selecting a section")
                logging.error(e)
                raise

            self.scrape_terms(course_attrs)
            self.session.return_from_course()
    
    def scrape_terms(self, course):
        """ Scrape terms """
        
        # get all terms and iterate over the terms in list
        all_terms = self.session.parser1.all_terms()
        for term in all_terms:
            logging.info(u"------Term: {year} - {season}".format(**term))
            self.session.switch_to_term(term["_unique"])

            self.session.view_all_sections()
            self.scrape_sections(course, term)
    
    def scrape_sections(self, course, term):
        """ Scrape sections """

        # grab all basic data
        all_sections = self.session.parser1.all_section_data()

        if logging.getLogger().isEnabledFor(logging.INFO):
            for section in all_sections:
                logging.info(u"--------Section: {class_num}-{type} ({solus_id}) -- {status}".format(**section["basic"]))
                if not self.job['deep']:
                    logging.debug(u"SECTION CLASS DATA: {0}".format(section["classes"]))
        
        # Deep scrape, go to the section page and add all the data there
        if self.job["deep"]:
            for i in range(len(all_sections)):
                self.session.visit_section_page(all_sections[i]["_unique"])

                # append info to all_sections
                new_data = self.session.parser1.section_deep_attrs()
                all_sections[i].update(new_data)

                self.session.return_from_section()

                logging.debug(u"SECTION DEEP DATA DUMP: {0}".format(all_sections[i]))

        for section in all_sections:
            section['basic']['course'] = course['basic']['number']
            section['basic']['subject'] = course['basic']['subject']
            section['basic']['year'] = term['year']
            section['basic']['season'] = term['season']       

            writer.write_section(section)        
