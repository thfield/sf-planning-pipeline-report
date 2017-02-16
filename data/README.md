Housing Pipeline Dataset
========================

This directory contains the housing pipeline dataset in CSV form.

Each file represents the data from one quarter.

Data Model
----------

Each row represents a _transition_ into another stage of the pipeline for a single project.

This means the same project can occur multiple times in the dataset, since multiple transitions are required before a project is complete.

Below are the 7 states that a project can be in:

| PROJECT STATUS     | Current pipeline status of a project application.                               |
|--------------------|---------------------------------------------------------------------------------|
| Under Construction | Project is under construction.                                                  |
| BP Approved        | DBI approved building permit.                                                   |
| BP Issued          | Project sponsor has picked up approved building permit (proxy measure of under construction). |
| BP Reinstated      | DBI reinstates a lapsed building permit (lapses after 1 year with no activity). |
| BP Filed           | Application for building permit filed with BPI                                  |
| PL Approved        | All Planning actions approved.                                                  |
| PL Filed           | Project application filed with the Planning Department                          |

Other Notes
-----------

The Pipeline Report measures housing production in terms of housing units. Non-residential development, on the other hand, is measured in terms of building square footage. 

Columns concerning number of units may be blank for non-residential development, and vice versa. 
