using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;


public class SceneController : MonoBehaviour
{

    public GameObject zonePrefab;
    public GameObject MeshPrefab;
    public UnityEngine.TextMesh textField;


    // Read the svg file
    private string url = "http://baselhack.nicolasmauchle.ch/bezirke";


    private string data = "";

    void Start()
    {

        MockUpData mData = new MockUpData();

        // textField.text = data;

            List<Zone> zoneList = SVGFileReader.readZones(Application.dataPath + "/temp.json");


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



        /*
         textField.text = "starting webrequest";
        using (UnityWebRequest www = UnityWebRequest.Get(url))
        {
            textField.text = "sending";
            yield return www.Send();
            textField.text = "sent";

            if (www.isNetworkError || www.isHttpError)
            {
                textField.text = www.error;
            }
            else
            {
                // Show results as text 
                textField.text = "loading";
                data = www.downloadHandler.text;
                if(data != null)
                {
                    textField.text = data;
                }
               

                if (data.Length > 0) { }
                textField.text = "wehavedata";
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
        }
    }
    /*
    //void Start()
    {
        string data = "";

        UnityWebRequest www = new WWW(url);
        while (!www.isDone)
        {
            yield return null;
        }
        if (string.IsNullOrEmpty(www.error))
        {
            //www.
            //MemoryStream stream = new MemoryStream(www.bytes);
           // stream.
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
    */

    }
}
