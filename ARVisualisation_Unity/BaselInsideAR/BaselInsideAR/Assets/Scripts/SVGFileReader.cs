
using System.Collections.Generic;
using UnityEngine;
using System.IO;

//using Pathfinding.Serialization.JsonFx;
using MiniJSON;



public class SVGFileReader
    {
 
    public static List<Zone> readZones(string path)
    {
    float pointNormalizationFactor = 50f;
    List<Zone> zoneList = new List<Zone>();

        var streamReader = new StreamReader(new FileStream(path, FileMode.Open));
        string data = streamReader.ReadToEnd();
        streamReader.Dispose();

        

        Dictionary<string, object> dict = (Dictionary<string, object>)Json.Deserialize(data);

        List<object> list = (List<object>)dict["features"];
        foreach (object ob in list)
        {
            //Zone newZone = new Zone("test");
            Dictionary<string, object> subList = (Dictionary<string, object>)ob;
            Dictionary<string, object> geometry = (Dictionary<string, object>)subList["geometry"];
            foreach (object geomOb in geometry)
            {
                List<object> coordinateList = (List<object>)geometry["coordinates"];
                foreach (object coordinate in coordinateList)
                {
                    List<object> coo = ((List<object>)coordinate);
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

        /*  rootObject.features.ForEach(delegate (Feature feature)
          {
              Zone zone = new Zone(feature.properties.BEZ_ID, feature.properties.BEZ_NAME);
              zoneList.Add(zone);
              List<Vector3> pointList = new List<Vector3>();
              feature.geometry.coordinates.ForEach(delegate (List<List<float>> list1)

              {
                  list1.ForEach(delegate (List<float> coordinatePair){
                      Vector3 vec = new Vector3();
                      vec.Set(coordinatePair[0]/pointNormalizationFactor - 52232f, 0, coordinatePair[1]/pointNormalizationFactor - 25100f);
                      pointList.Add(vec);
              });

              });
              zone.setPointList(pointList);
          });*/
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