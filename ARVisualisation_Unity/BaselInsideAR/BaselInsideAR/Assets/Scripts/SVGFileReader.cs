
using System.Collections.Generic;
using UnityEngine;
using System.IO;


//using Pathfinding.Serialization.JsonFx;
using MiniJSON;



public class SVGFileReader
{



    // public static List<Zone> readZones(string path)
    public static List<Zone> readZones(string data)
    {
        float pointNormalizationFactor = 50f;
        List<Zone> zoneList = new List<Zone>();

        /* var streamReader = new StreamReader(new FileStream(path, FileMode.Open));
         string data = streamReader.ReadToEnd();
         streamReader.Dispose();
         */

          /*     TextAsset dataAsset = Resources.Load(path) as TextAsset;
        string data = dataAsset.text;
        */

   
        

        object dict = Json.Deserialize(data);
        
        foreach (object listItem in (List<object>)dict)
        {
            object id;
            object name;
            object coordinates;
            Debug.Log(listItem.GetType());

            int idInt;
            string nameString;
            List<Vector3> pointList = new List<Vector3>();

            Dictionary<string, object> a = (Dictionary<string, object>)listItem;
            Zone newZone;

            if (a.TryGetValue("id", out id))
            {

                int.TryParse((string)id, out idInt);

                if (a.TryGetValue("name", out name))
                {
                    nameString = (string)name;
                    newZone = new Zone(idInt, nameString);
                    if (a.TryGetValue("coordinates", out coordinates))
                    {
                        string c = (string)coordinates;
                        string[] values = c.Split(' ');
                        Vector3 previousVec = new Vector3();
                        for (int i = 0; i < values.Length; i++)
                        {
                            string[] pointCoord = values[i].Split(',');
                            if (pointCoord.Length > 1)
                            {
                                float pointCoordFloat1;
                                float pointCoordFloat2;
                                
                                if (float.TryParse(pointCoord[0], out pointCoordFloat1) && float.TryParse(pointCoord[1], out pointCoordFloat2))
                                {
                                    Vector3 vec = new Vector3();
                                    vec.Set(pointCoordFloat1 + previousVec.x, 0 , pointCoordFloat2 + previousVec.z);
                                    previousVec = vec;
                                    pointList.Add(vec);
                                }
                            }
                           
                        }
                       
                        newZone.setPointList(pointList);

                    }
                    zoneList.Add(newZone);
                }
            }
        }

        return zoneList;
    }
     //   string list = dict["features"];
       /* foreach (object string in list)
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
        */
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