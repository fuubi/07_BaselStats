using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Xml;
using System.IO;
using System.Text;
using MiniJSON;


    public class SVGFileReader
    {

    public static List<Zone> readZones(string path)
    {
        List<Zone> zoneList = new List<Zone>();


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
        return zoneList;
    }
}

