import pandas
import logging

from osgeo import ogr


logging.basicConfig()


def load_polygons():
    driver = ogr.GetDriverByName('ESRI Shapefile')
    polyshp = driver.Open('gis/shp/neighborhoods.shp')
    polygon_layer = polyshp.GetLayer(0)
    return list(polygon_layer)


def get_point(x, y):
    point = ogr.Geometry(ogr.wkbPoint)
    logging.info("Adding point: ({x},{y})".format(x=x, y=y))
    point.AddPoint(x, y)
    return point


def classify_point(point, polygons):
    for polygon in polygons:
        import ipdb;ipdb.set_trace()
        if polygon.GetGeometryRef().Contains(point):
            return polygon.GetField('nhood')
    logging.info("No polygon found for {}".format(str(point)))
    return "Unknown"


def classify_df(df):
    polygons = load_polygons()
    coords = zip(df.x.tolist(), df.y.tolist())
    df['classified_neighborhood'] = pandas.Series([classify_point(get_point(*coord), polygons) for coord in coords])
