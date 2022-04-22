#! python3
# -*- coding: utf-8 -*-

"""
Scrape course information from the Ohio State Course Catalog
and export to CSV file
"""

import tqdm
import requests

import pandas as pd

from catalogParse import getSubjects
from utils.helpers import checkPages

from colorama import init, Fore

# Cross-platform colored terminal text
init(autoreset=True)

courses_url = "https://content.osu.edu/v2/classes/search?q={}&campus=COL"
page = 1  # TODO: fix hard-code


def getCourses(subjects: list):
    # tqdm status message logging
    # code adapted from https://gist.github.com/phillies/4e44d2df02aeda9563991d0c7a0c411d#file-tqdm_log-py
    subject_log = tqdm.tqdm(
        total=0, position=1, bar_format="{desc}"
    )  # prevents duplicate progress bar

    courses = []  # empty list to write course info to

    for subject in tqdm.tqdm(subjects):
        subject_log.set_description_str(f"Current Subject: {subject}")

        url = courses_url.format(
            subject
        )  # i.e. https://content.osu.edu/v2/classes/search?q=art&campus=COL

        response = requests.get(url)
        res = response.json()
        totalPages = checkPages(res)

        if totalPages < page:
            pass

        for p in range(totalPages):
            url = f"https://content.osu.edu/v2/classes/search?q={subject}&campus=COL&p={p}"
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
                        course_title = data[i]["course"]["title"]
                        units = data[i]["course"]["minUnits"]
                        academic_career = data[i]["course"]["academicCareer"]
                        description = data[i]["course"]["description"]
                        try:
                            academic_group = data[i]["course"]["academicGroup"]
                        except:
                            academic_group = " "

                        # course attributes (i.e. Honors, GE)
                        for h in range(len(data[i]["course"]["courseAttributes"])):
                            # print(Fore.GREEN + "Success! Has Attribute")
                            try:
                                course_attribute = data[i]["course"][
                                    "courseAttributes"
                                ][h][
                                    "description"
                                ]  # description of attribute
                                attribute_type = data[i]["course"]["courseAttributes"][
                                    h
                                ][
                                    "name"
                                ]  # attribute type (i.e. HON for honors)
                            except:
                                course_attribute = " "
                                attribute_type = " "

                            courses.append(
                                {
                                    "subject": subject,
                                    "course_id": course_id,
                                    "course_name": course_name,
                                    "course_title": course_title,
                                    "units": units,
                                    "academic_group": academic_group,
                                    "academic_career": academic_career,
                                    "description": description,
                                    "course_attribute": course_attribute,
                                    "attribute_type": attribute_type,
                                }
                            )

                    else:
                        pass
            except:
                pass

    return courses


def saveCourses():
    courses = getCourses(
        subjects=getSubjects(
            driver_path="/Users/julia/Projects/buckiplan/scraper/chromedriver",
            url="https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?",
        )
    )
    df = pd.DataFrame(courses)

    df.drop_duplicates(subset="course_name", keep="first", inplace=True)

    # To remove carriage return (\r), new line (\n) and tab (\t)
    # fix for csv breaking
    courses_df = df.replace(r"\r+|\n+|\t+", "", regex=True)
    courses_df.to_csv("data/courses.csv", index=False)
    print(Fore.GREEN + "Success! Information saved to CSV file")


saveCourses()
