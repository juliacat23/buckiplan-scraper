#! python3
# -*- coding: utf-8 -*-

"""
scrape course information from Ohio State course catalog
and export to CSV file
"""

from selenium import webdriver
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

from tqdm import tqdm
from catalogParse import getSubjects
from helpers import checkPages

import pandas as pd
import requests
import warnings

import sys, os, time
import csv, json
import pprint

warnings.filterwarnings("ignore")

courses_url = "https://content.osu.edu/v2/classes/search?q={}&campus=COL"
page = 1


def getCourses(subjects: list):
    """scrape courses from osu catalog

    Args:
        subjects (list): list of department codes ("subjects")

    Returns:
        courses (df): dataframe of course information

    """
    courses = []

    # tqdm for status logging
    # adapted from https://gist.github.com/phillies/4e44d2df02aeda9563991d0c7a0c411d#file-tqdm_log-py
    subject_log = tqdm.tqdm(total=0, position=1, bar_format="{desc}")
    subject_log.set_description_str(f"Current Subject: {subject}")
    for subject in tqdm(subjects):
        url = courses_url.format(subject)
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
                        subject = data["i"]["course"]["subject"]
                        catalog_number = data[i]["course"]["catalogNumber"]
                        course_id = subject + " " + catalog_number
                        course_title = data[i]["course"]["title"]
                        catalog_level = data[i]["course"]["catalogLevel"]
                        description = data[i]["course"]["description"]

                        courses.append(
                            {
                                "subject": subject,
                                "course_id": course_id,
                                "course_title": course_title,
                                "catalog_level": catalog_level,
                                "description": description,
                            }
                        )
            except:
                pass

        return courses


def saveCourses():
    """save course information to csv file"""
    courses = getCourses(
        subjects=getSubjects(
            driver_path="/Users/julia/Projects/OSU-Course-Scraper/chromedriver",
            url="https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?",
        )
    )
    df = pd.DataFrame(courses)
    df.to_csv("data/courses.csv", index=False)
    print("Information saved to CSV file")


saveCourses()
