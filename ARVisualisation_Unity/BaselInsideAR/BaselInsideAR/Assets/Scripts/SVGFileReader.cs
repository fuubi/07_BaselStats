using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Xml;
using System.IO;
using System.Text;


    public class SVGFileReader
    {

    public static List<Zone> readZones(string path)
    {
        List<Zone> zoneList = new List<Zone>();


        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load(path);

        XmlElement root = xmlDoc.DocumentElement;
        XmlNodeList nodes = root.SelectNodes("svg");

        foreach (XmlNode node in nodes)
        {
            Zone newZone = new Zone("test");
        }
        return zoneList;
    }
}

