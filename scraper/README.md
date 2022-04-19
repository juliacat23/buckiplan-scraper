# OSU Course Scraper

> A collection of python3 scripts used to scrape and organize data from The Ohio
> State University's
> [course catalog](https://courses.osu.edu/psp/csosuct/EMPLOYEE/PUB/c/COMMUNITY_ACCESS.OSR_CAT_SRCH.GBL?).

## Files

| File Name       | Brief Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------------ |
| catalogParse.py | script to extract a list of the department codes ("subjects") from catalog dropdown button |
| termParse.py    | script to retrieve terms and corresponding term codes                                      |
| osuCourses.py   | Scrape course information from the Ohio State Course Catalog and export to CSV file        |
| osuSchedule.py  | Scrape course + schedule information from the Ohio State Course Catalog                    |
| helpers.py      | various helper functions to use in other scripts                                           |
