#! python3
# -*- coding: utf-8 -*-

"""
Scrape course information from the Ohio State Course Catalog
and export to CSV file
"""

import tqdm
import requests
import warnings

import pandas as pd

from catalogParse import getSubjects
from helpers import checkPages

from colorama import init, Fore

# Cross-platform colored terminal text
init(autoreset=True)

courses_url = "https://content.osu.edu/v2/classes/search?q={}&campus=COL"
page = 1  # TO-DO: fix hard-code


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
                        catalog_number = data[i]["course"]["catalogNumber"]
                        course_id = subject + " " + catalog_number
                        course_title = data[i]["course"]["title"]
                        catalog_level = data[i]["course"]["catalogLevel"]
                        description = data[i]["course"]["description"]

                        # # course attributes (i.e. Honors, GE)
                        if "courseAttributes" in data[i]["course"]:
                            for h in range(len(data[i]["courseAttributes"])):
                                course_attribute = data[i]["courseAttributes"][h][
                                    "description"
                                ]  # description of attribute
                                attribute_type = data[i]["courseAttributes"][h][
                                    "name"
                                ]  # attribute type (i.e. HON for honors)
                        else:
                            course_attribute = " "
                            attribute_type = " "

                        courses.append(
                            {
                                "subject": subject,
                                "course_id": course_id,
                                "course_title": course_title,
                                "catalog_level": catalog_level,
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

    # To remove carriage return (\r), new line (\n) and tab (\t)
    # fix for csv breaking
    df = df.replace(r"\r+|\n+|\t+", "", regex=True)
    df.drop_duplicates(subset="course_id", keep="first", inplace=True)
    df.to_csv("data/courses.csv", index=False)
    print(Fore.GREEN + "Information saved to CSV file")


saveCourses()
