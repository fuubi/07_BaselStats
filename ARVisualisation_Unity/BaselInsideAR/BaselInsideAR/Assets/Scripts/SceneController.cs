using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;

	// Use this for initialization
	void Start () {


        // Read the svg file

        List<Zone> zoneList = SVGFileReader.readZones("C:/Programmierung/BaselInside/data/json/Bezirke.json");

        zoneList.ForEach(delegate (Zone zone)
        {
            // Instantiate the zone 
            GameObject zoneGameObject = (GameObject)Instantiate(zonePrefab);
            LineRenderer lineRenderer = zoneGameObject.GetComponent<LineRenderer>();
            lineRenderer.positionCount = zone.getPointList().Count;
            lineRenderer.SetPositions(zone.getPointList().ToArray());

        });
       
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
