using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;



public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;
    public GameObject MeshPrefab;
    public UnityEngine.TextMesh textField;


    // Read the svg file
    private string url = "http://baselhack.nicolasmauchle.ch/bezirke";

    IEnumerator Start()
    //void Start()
    {
        string data = "";

        WWW www = new WWW(url);
        while (!www.isDone)
        {
            yield return null;
        }
        if (string.IsNullOrEmpty(www.error))
        {
            data = www.text;
        }
        else
        {
            yield return null;
        }
        www.Dispose();


        // List<Zone> zoneList = SVGFileReader.readZones(Application.dataPath + "/Resources/Json/" + "Bezirke.json");
        if (data.Length > 5) { }
        List<Zone> zoneList = SVGFileReader.readZones(data);

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
