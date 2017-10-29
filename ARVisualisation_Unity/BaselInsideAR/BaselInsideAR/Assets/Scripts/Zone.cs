using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Zone {

    private List<Vector3> pointList;
    private int id;
    private string name;
    private Vector3 center;

    public Zone(int newId, string newName) {
        pointList = new List<Vector3>();
        id = newId;
        name = newName;
    }

    public string getName()
    {
        return name;
    }

    public void setName(string newName){
        name = newName;
    }

   
    public void setPointList(List<Vector3> points)
    {
        pointList = points;
    }

    public List<Vector3> getPointList()
    {
        return pointList;
    }

    public int getId()
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
