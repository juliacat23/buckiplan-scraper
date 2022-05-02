import numpy as np
import pandas as pd

"""
Process and clean data parsed from the OSU course 
catalog and schedule API 
"""

df = pd.read_csv("data/sections.csv")
df.drop_duplicates(subset=["course_id", "terms"], keep="first", inplace=True)
df = df.groupby(["course_id"])["terms"].agg(lambda x: ", ".join(x)).reset_index()

df["terms"] = np.where(
    (df["terms"] == "Autumn 2022, Summer 2022"), "Fall, Summer", df["terms"]
)
df["terms"] = np.where(
    (df["terms"] == "Autumn 2022, Spring 2022"), "Fall, Spring", df["terms"]
)
df["terms"] = np.where(
    (df["terms"] == "Autumn 2022, Spring 2022, Summer 2022"),
    "Fall, Spring, Summer",
    df["terms"],
)
df["terms"] = np.where(
    (df["terms"] == "Spring 2022, Summer 2022"), "Spring, Summer", df["terms"]
)
df["terms"] = np.where((df["terms"] == "Autumn 2022"), "Fall", df["terms"])
df["terms"] = np.where((df["terms"] == "Spring 2022"), "Spring", df["terms"])
df["terms"] = np.where((df["terms"] == "Summer 2022"), "Summer", df["terms"])

courses = pd.read_csv("data/courses.csv")
merged = courses.merge(df, on="course_id")
merged["academic_group"] = np.where(
    (merged["subject"] == "PHR"), "Pharmacy", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "LAW"), "Law", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "NURSING"), "Nursing", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBAFRS"), "John Glenn", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBHBIO"), "Public Health", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBHEHS"), "Public Health", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBHEPI"), "Public Health", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBHHBP"), "Public Health", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBHHMP"), "Public Health", merged["academic_group"]
)
merged["academic_group"] = np.where(
    (merged["subject"] == "PUBHLTH"), "Public Health", merged["academic_group"]
)
merged["academic_career"] = np.where(
    (merged["academic_career"] == "Law"), "Graduate", merged["academic_career"]
)


merged.to_csv("data/coursesWithSemesters.csv", index=False)

courses = pd.read_csv("data/courses.csv")
attrs = courses[["course_id", "course_attribute"]].copy()
attrs["course_attribute"] = attrs["course_attribute"].replace(np.nan, "dummy")
attrs = (
    attrs.groupby(["course_id"])["course_attribute"]
    .agg(lambda x: ", ".join(x))
    .reset_index()
)
attrs["course_attribute"] = attrs["course_attribute"].replace("dummy", np.nan)
attrs.drop_duplicates(
    subset=["course_id", "course_attribute"], keep="first", inplace=True
)

courses = pd.read_csv("data/courses.csv")
types = courses[["course_id", "attribute_type"]].copy()
types["attribute_type"] = types["attribute_type"].replace(np.nan, "dummy")
types = (
    types.groupby(["course_id"])["attribute_type"]
    .agg(lambda x: ", ".join(x))
    .reset_index()
)
types["attribute_type"] = types["attribute_type"].replace("dummy", np.nan)
types.drop_duplicates(
    subset=["course_id", "attribute_type"], keep="first", inplace=True
)

coursesWOAttrs = merged.copy()
del coursesWOAttrs['attribute_type']
del coursesWOAttrs['course_attribute']

coursesWithAttrs = coursesWOAttrs.merge(attrs, on="course_id")
coursesWithAttrs = coursesWithAttrs.merge(types, on="course_id")
coursesWithAttrs.drop_duplicates(keep="first", inplace=True)
coursesWithAttrs.insert(0, 'course_id', coursesWithAttrs.pop('course_id'))
coursesWithAttrs["academic_group"] = coursesWithAttrs["academic_group"].replace(" ", np.nan)
coursesWithAttrs["attribute_type"] = np.where((coursesWithAttrs["course_attribute"].str.contains('Not eligible for College Credit Plus program')), np.nan, coursesWithAttrs["attribute_type"])
coursesWithAttrs["course_attribute"] = coursesWithAttrs["course_attribute"].replace("Not eligible for College Credit Plus program", np.nan)

coursesWithAttrs = coursesWithAttrs.replace({'multi_enroll': {'Y': True, 'N': False}})
sorted_df = coursesWithAttrs.sort_values(by=['course_name'], ascending=True)

sorted_df = sorted_df.drop(columns=['course_id'])
sorted_df.to_csv("data/coursesWithSemesters.csv", index=False)

sorted_df.to_json('data/courses.json', orient='records')