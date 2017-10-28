using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneController : MonoBehaviour {

    public GameObject zonePrefab;

	// Use this for initialization
	void Start () {


        // Read the svg file

        // Instantiate the zone 
        Instantiate(zonePrefab);
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
