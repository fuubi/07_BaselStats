using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;
    public GameObject MeshPrefab;

	// Use this for initialization
	void Start () {


        // Read the svg file

        List<Zone> zoneList = SVGFileReader.readZones("C:/Users/quentin.garnier/Documents/Projects/BaselInside/data/json/Bezirke.json");

        zoneList.ForEach(delegate (Zone zone)
        {
            // Instantiate the zone 
            GameObject zoneGameObject = (GameObject)Instantiate(zonePrefab);
            LineRenderer lineRenderer = zoneGameObject.GetComponent<LineRenderer>();
            lineRenderer.positionCount = zone.getPointList().Count;
            List<Vector3> test = zone.getPointList();
            lineRenderer.SetPositions(zone.getPointList().ToArray());

            //create, then instantiate the mesh on the scene
            ConvertZoneToMesh convertZone = new ConvertZoneToMesh();
            Mesh mesh = convertZone.convert(zone);

            GameObject meshGameObject = (GameObject)Instantiate(MeshPrefab);
            MeshFilter mf = meshGameObject.GetComponent<MeshFilter>();
            mf.mesh = mesh;
            

        });
       
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
