using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;



public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;
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
            lineRenderer.SetPositions(zone.getPointList().ToArray());

        });
    }

	
	// Update is called once per frame
	void Update () {
		
	}
}
