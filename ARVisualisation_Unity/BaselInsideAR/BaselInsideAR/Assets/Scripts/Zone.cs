using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Zone {

    private List<Vector3> pointList;
    private string id;
    private Vector3 center;

    public Zone(string newid) {
        pointList = new List<Vector3>();
        id = newid;
    }
   
    public void setPointList(List<Vector3> points)
    {
        pointList = points;
    }

    public List<Vector3> getPointList()
    {
        return pointList;
    }

    public string getId()
    {
        return id;
    }

    public Vector3? getCenter()
    {
        if (center != null)
        {
            return center;
        }
        else
            return null;
    }

    public void setCenter(Vector3 newCenter)
    {
        center = newCenter;
    }
}
