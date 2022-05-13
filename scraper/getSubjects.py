#! python3
# -*- coding: utf-8 -*-

"""
Extract information that populates the dropdown buttons
in the OSU catalog
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.chrome.options import Options

import json
import pandas as pd


def getSubjects(driver_path, url):
    """retrieve subjects from menu in course catalog

    Args:
        driver_path (str): path to chrome driver
        url (str): url to course catalog

    Returns:
        subjects (list): list of subjects extracted from the dropdown menu
    """

    code = []
    value = []

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(driver_path, options=chrome_options)
    driver.get(url)
    iframe = driver.find_element_by_id("ptifrmtgtframe")
    driver.switch_to.frame(iframe)
    count = len(
        WebDriverWait(driver, 20).until(
            EC.visibility_of_all_elements_located(
                (By.XPATH, "//select[@id='SSR_CLSRCH_WRK_SUBJECT_SRCH$1']/option")
            )
        )
    )

    dropdown = Select(
        driver.find_element_by_xpath("//*[@id='SSR_CLSRCH_WRK_SUBJECT_SRCH$1']")
    )
    for i in dropdown.options:
        code.append(i.get_attribute("value"))
    
    for i in dropdown.options:
        value.append(i.text)
    
    df = pd.DataFrame()

    text_len = len(value) + 1
    id = pd.Series(range(1,text_len))

    df['pk'] = id
    df['model'] = 'api.subject'
    df['subject_name'] = value
    df['abbrev'] = code

    df["fields"] = df.apply(lambda x: {"name": x.subject_name, "abbrev": x.abbrev }, axis=1)
    dictionary = df[["pk", "model", "fields"]].to_dict(orient="records")

    subjects_json = json.dumps(dictionary, indent=4)


    with open("data/subjects.json", "w") as outfile:
        outfile.write(subjects_json)


subjects=getSubjects(
            driver_path="/Users/julia/Projects/buckiplan/scraper/chromedriver",
            url="https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?",
        )


    