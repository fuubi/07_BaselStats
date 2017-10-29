using System.Collections;
using System.Collections.Generic;
using UnityEngine;



public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;
    public UnityEngine.TextMesh textField;


    // Read the svg file
    public string url = "http://127.0.0.1:8080/svg/Bezirke.json";

    //IEnumerator Start()
    void Start()
    {

       /* WWW www = new WWW(url);
        yield return www;
        string data = www.text;*/

        List<Zone> zoneList = SVGFileReader.readZones(Application.dataPath + "/Resources/Json/" + "Bezirke.json");
        //List<Zone> zoneList = SVGFileReader.readZones(data);

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
