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
        List<Zone> zoneList = new List<Zone>();

        var streamReader = new StreamReader(path);
        string data = streamReader.ReadToEnd();
        streamReader.Close();


        RootObject rootObject = JsonReader.Deserialize<RootObject>(data);
        Debug.Log("stuff");
        Debug.Log(rootObject.features[0].geometry.coordinates);
        return zoneList;
    }
}

public class Geometry
{
    public string type { get; set; }
    public List<List<List<double>>> coordinates { get; set; }
}

public class Properties
{
    public string BEZ_ID { get; set; }
    public string BEZ_NAME { get; set; }
    public string BEZ_LABEL { get; set; }
    public string WOV_ID { get; set; }
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