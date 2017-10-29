using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Xml;
using System.IO;
using System.Text;

using System.Xml.Linq;
using System;
using Pathfinding.Serialization.JsonFx;

using MiniJSON;


public class SVGFileReader
    {
 
    public static List<Zone> readZones(string path)
    {
    float pointNormalizationFactor = 50f;
    List<Zone> zoneList = new List<Zone>();

        var streamReader = new StreamReader(path);
        string data = streamReader.ReadToEnd();
        streamReader.Close();


        RootObject rootObject = JsonReader.Deserialize<RootObject>(data);
        rootObject.features.ForEach(delegate (Feature feature)
        {
            Zone zone = new Zone(feature.properties.BEZ_ID, feature.properties.BEZ_NAME);
            zoneList.Add(zone);
            List<Vector3> pointList = new List<Vector3>();
            feature.geometry.coordinates.ForEach(delegate (List<List<float>> list1)

            {
                list1.ForEach(delegate (List<float> coordinatePair){
                    Vector3 vec = new Vector3();
                    vec.Set(coordinatePair[0]/pointNormalizationFactor - 52212f, 0, coordinatePair[1]/pointNormalizationFactor - 15350f);
                    //vec.Set(coordinatePair[0], 0, coordinatePair[1]);
                    pointList.Add(vec);
            });

            });
            zone.setPointList(pointList);
        });
        return zoneList;
    }
}

public class Geometry
{
    public string type { get; set; }
    public List<List<List<float>>> coordinates { get; set; }
}

public class Properties
{
    public int BEZ_ID { get; set; }
    public string BEZ_NAME { get; set; }
    public string BEZ_LABEL { get; set; }
    public string WOV_ID { get; set; }
    public string WOV_NAME { get; set; }
    public string WOV_LABEL { get; set; }
    public double Area { get; set; }
}

public class Feature
{
    public string type { get; set; }
    public Geometry geometry { get; set; }
    public Properties properties { get; set; }
}

public class RootObject
{
    public string name { get; set; }
    public string type { get; set; }
    public List<Feature> features { get; set; }
}