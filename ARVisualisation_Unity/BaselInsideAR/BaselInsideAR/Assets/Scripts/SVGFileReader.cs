using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Xml;
using System.IO;
using System.Text;
<<<<<<< HEAD
using System.Xml.Linq;
using System;
using Pathfinding.Serialization.JsonFx;
=======
using MiniJSON;
>>>>>>> b7842f3b74aaf0f2643dadbdb519c2ea9ef00b30

public class SVGFileReader
    {

    public static List<Zone> readZones(string path)
    {
        List<Zone> zoneList = new List<Zone>();

        var streamReader = new StreamReader(path);
        string data = streamReader.ReadToEnd();
        streamReader.Close();

<<<<<<< HEAD
        RootObject rootObject = JsonReader.Deserialize<RootObject>(data);
        Debug.Log("stuff");
        Debug.Log(rootObject.features[0].geometry.coordinates);
=======
        string json = File.ReadAllText(path);
        Dictionary<string, object> dict = (Dictionary<string, object>)Json.Deserialize(json);
       
        List<object> list = (List<object>)dict["features"];
        foreach (object ob in list)
        {
            Dictionary<string, object> subList = (Dictionary<string, object>)ob;
            Dictionary<string, object> geometry = (Dictionary < string, object>) subList["geometry"];
            foreach (object geomOb in geometry)
            {
                List <object> coordinateList =(List <object>) geometry["coordinates"];
                foreach(object coordinate in coordinateList){
                    List < object > coo = ((List<object>)coordinate);
                    foreach (object pointValue in coo)
                    {
                        List<object> singlePoint = ((List<object>)pointValue);
                        foreach (object singlePointValue in singlePoint)
                        {
                            double d;
                            if (singlePointValue is System.IConvertible)
                            {
                                d = ((System.IConvertible)singlePointValue).ToDouble(null);
                            }
                            else
                            {
                                d = 0d;
                            }
                        }
                    }
                }
            }
        }
>>>>>>> b7842f3b74aaf0f2643dadbdb519c2ea9ef00b30
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