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
from termParse import getTerms
from helpers import checkPages


from colorama import init, Fore

# Cross-platform colored terminal text
init(autoreset=True)


def getSections(subjects: list, terms: list):
    term_log = tqdm.tqdm(total=0, position=1, bar_format="{desc}")
    subject_log = tqdm.tqdm(total=0, position=2, bar_format="{desc}")

    sections = []
    for term in tqdm.tqdm(terms, colour=Fore.BLUE):
        term_log.set_description_str(f"Current Term: {term}")

        for subject in tqdm.tqdm(subjects, colour=Fore.GREEN):
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
                            catalog_number = data[i]["course"]["catalogNumber"]
                            course_id = subject + " " + catalog_number

                            for j in range(len(data[i]["sections"])):
                                section_id = data[i]["sections"][j]["classNumber"]
                                component = data[i]["sections"][j]["component"]
                                instruction_mode = data[i]["sections"][j][
                                    "instructionMode"
                                ]

                                for k in range(len(data[i]["sections"][j]["meetings"])):
                                    meeting_num = data[i]["sections"][j]["meetings"][k][
                                        "meetingNumber"
                                    ]
                                    startTime = data[i]["sections"][j]["meetings"][k][
                                        "startTime"
                                    ]
                                    endTime = data[i]["sections"][j]["meetings"][k][
                                        "endTime"
                                    ]
                                    monday = data[i]["sections"][j]["meetings"][k][
                                        "monday"
                                    ]
                                    tuesday = data[i]["sections"][j]["meetings"][k][
                                        "tuesday"
                                    ]
                                    wednesday = data[i]["sections"][j]["meetings"][k][
                                        "wednesday"
                                    ]
                                    thursday = data[i]["sections"][j]["meetings"][k][
                                        "thursday"
                                    ]
                                    friday = data[i]["sections"][j]["meetings"][k][
                                        "friday"
                                    ]

                                    sections.append(
                                        {
                                            "course_id": course_id,
                                            "section_id": section_id,
                                            "component": component,
                                            "instruction_mode": instruction_mode,
                                            "meeting_num": meeting_num,
                                            "startTime": startTime,
                                            "endTime": endTime,
                                            "monday": monday,
                                            "tuesday": tuesday,
                                            "wednesday": wednesday,
                                            "thursday": thursday,
                                            "friday": friday,
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
