import pandas
import logging
import dateutil


logging.basicConfig(level=logging.INFO)


def convert_to_one_record_per_project(df):
    """
    Group the dataset by (apn, address) and then emit one row per (apn, address) pair.

    best_date and best_stat will be converted into arrays.

    All other attributes will be taken from the record with the most recent `best_date` attribute.
    """
    gb = df.groupby(['apn', 'address'])
    for k in gb.groups:
        group_df = gb.get_group(k)
        group_df = group_df.sort('best_date')
        last_row = group_df.tail(1).copy()

        last_row['latest_project_record_date'] = last_row.best_date
        last_row['first_project_record_date'] = group_df.head(0).best_date
        last_row['latest_project_status'] = last_row.best_stat

        ## Store a parseable list of all the project states and the dates those states were reported
        last_row['project_dates'] = str(tuple(group_df.best_date))
        last_row['project_statuses'] = str(tuple(group_df.best_stat))

        ## Store the project duration in days
        latest = last_row.latest_project_record_date.iloc[0]
        first = last_row.first_project_record_date.iloc[0]
        if not (pandas.isnull(latest) or pandas.isnull(first)):
            last_row['project_duration_days'] = (dateutil.parser.parse(latest) - dateutil.parser.parse(first)).days

        yield last_row


def main():
    df = pandas.read_csv("data/cleaned/all_quarters_merged.csv")
    new_df = pandas.concat(convert_to_one_record_per_project(df))
    logging.info("Writing output ({} rows, {} cols) to data/cleaned/all_quarters__one_record_per_project.csv".format(*new_df.shape))
    new_df.to_csv("data/cleaned/all_quarters__one_record_per_project.csv")


if __name__ == '__main__':
    main()
