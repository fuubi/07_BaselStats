using System.Collections;
using System.Collections.Generic;
using UnityEngine;



public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;
<<<<<<< HEAD
    public GameObject MeshPrefab;
=======
    public UnityEngine.TextMesh textField;

>>>>>>> 37e3a52435291bb976b354cf9afbf7ec96b3ac7c

    // Read the svg file
    public string url = "http://127.0.0.1:8080/svg/Bezirke.json";

    //IEnumerator Start()
    void Start()
    {

       /* WWW www = new WWW(url);
        yield return www;
        string data = www.text;*/

<<<<<<< HEAD
        List<Zone> zoneList = SVGFileReader.readZones("C:/Users/quentin.garnier/Documents/Projects/BaselInside/data/json/Bezirke.json");
=======
        List<Zone> zoneList = SVGFileReader.readZones(Application.dataPath + "/Resources/Json/" + "Bezirke.json");
        //List<Zone> zoneList = SVGFileReader.readZones(data);
>>>>>>> 37e3a52435291bb976b354cf9afbf7ec96b3ac7c

        zoneList.ForEach(delegate (Zone zone)
        {
            textField.text = "loading zone" + zone.getName();
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
