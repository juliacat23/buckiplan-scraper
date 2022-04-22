#! python3
# -*- coding: utf-8 -*-

"""
Retrieve course information from the Ohio State course 
schedule API and export to CSV file
"""

import tqdm
import requests
import warnings
import pandas as pd

from catalogParse import getSubjects, getTerms
from utils.helpers import checkPages


from colorama import init, Fore

# Cross-platform colored terminal text
init(autoreset=True)

warnings.filterwarnings("ignore")  # surpress warnings


def getSections(subjects: list, terms: list):
    term_log = tqdm.tqdm(total=0, position=1, bar_format="{desc}")
    subject_log = tqdm.tqdm(total=0, position=3, bar_format="{desc}")

    sections = []
    for term in tqdm.tqdm(terms):
        term_log.set_description_str(f"Current Term: {term}")

        for subject in tqdm.tqdm(subjects):
            subject_log.set_description_str(f"Current Subject: {subject}")
            url = f"https://content.osu.edu/v2/classes/search?q={subject}&campus=COL&p=1&term={term}"
            response = requests.get(url)
            res = response.json()
            totalPages = checkPages(res)
            page = 1

            if totalPages < page:
                pass

            for p in range(totalPages):
                url = f"https://content.osu.edu/v2/classes/search?q={subject}&campus=COL&p={p}&term={term}"
                response = requests.get(url)
                res = response.json()
                try:
                    data = res["data"]["courses"]
                    for i in range(len(data)):
                        if "title" in data[i]["course"]:
                            subject = data[i]["course"]["subject"]
                            course_id = data[i]["course"]["courseId"]
                            catalog_number = data[i]["course"]["catalogNumber"]
                            course_name = subject + " " + catalog_number
                            print(course_name)
                            terms = data[i]["course"]["term"]

                            sections.append(
                                {
                                    "course_name": course_name,
                                    "course_id": course_id,
                                    "terms": terms,
                                }
                            )
                        else:
                            pass
                except:
                    pass

    return sections


def saveSchedule():
    sections = getSections(
        subjects=getSubjects(
            driver_path="/Users/julia/Projects/buckiplan/scraper/chromedriver",
            url="https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?",
        ),
        terms=getTerms(
            driver_path="/Users/julia/Projects/buckiplan/scraper/chromedriver",
            url="https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?",
        ),
    )
    df = pd.DataFrame(sections)
    df.to_csv("data/sections.csv", index=False)
    print(Fore.GREEN + "Information saved to CSV file")


saveSchedule()
