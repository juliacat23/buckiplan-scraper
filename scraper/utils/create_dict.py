#! python3
# -*- coding: utf-8 -*-

"""
create dictionary from csv information and save it as json file
"""

# TODO: write file as function and export it from utils module

import csv
import json

allcourses = dict()
hasHeader = True
with open("input.csv") as f:
    csvreader = csv.reader(f)
    if hasHeader:
        next(csvreader)  # Consume one line if a header exists

    # Iterate over the rows, and unpack each row into three variables
    for course_name, term_name, instructor_name in csvreader:
        # If the course hasn't been processed yet, create a new dict for it
        if course_name not in allcourses:
            allcourses[course_name] = dict()

        # Get the dict object that holds this course's information
        course = allcourses[course_name]

        # If the term hasn't been processed already for this course, create a new dict for it in the course's dict
        if term_name not in course:
            course[term_name] = {"instructors": []}

        # Get the term dict object
        term = course[term_name]

        # Add this instructor's information to the term dict's "instructor" list
        term["instructors"].append({"name": instructor_name})

# Add all courses' data to the "data" key in our result dict
result = {"data": allcourses}
print(result)

with open("courses.json", "w") as f:
    json.dump(result, f)
