import React, { useEffect, useRef, useContext} from 'react';
import './Products.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {loginContext} from '../../contexts/loginContext';



function Products() {

  const mapContainerRef = useRef(null);
  let [user,loginErr,userLoginStatus,loginUser]=useContext(loginContext)

  const customMarker = L.icon({
    iconUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fsmall-n-flat%2F24%2Fmap-marker-512.png&tbnid=EeqL3TTfk2w8hM&vet=12ahUKEwj4nsOIwp6DAxWiSGwGHSmZDzIQMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F285659%2Fmarker_map_icon&docid=twXikGue4HjfcM&w=512&h=512&q=map%20marker&ved=2ahUKEwj4nsOIwp6DAxWiSGwGHSmZDzIQMygAegQIARBz',
    iconSize: [32, 32], // Adjust the size of your marker image
    iconAnchor: [16, 32], // Adjust the anchor point if needed
    popupAnchor: [0, -32], // Adjust the popup anchor point if needed
  });
  

  useEffect(() => {
    // Ensure map container is available
    if (!mapContainerRef.current) {
      console.error('Map container not found');
      return;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, { attributionControl: false }).setView([48.505, -0.09], 3);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let usermarker, circle, zoomed;

    const success = (pos) => {
      try {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;
        console.log(lng)
        console.log(lat)

        if (usermarker) {
          map.removeLayer(usermarker);
          map.removeLayer(circle);
        }

        //marker = L.marker([lat, lng]).addTo(map);
        usermarker = L.marker([lat, lng], { icon: customMarker }).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

        if (!zoomed) {
          zoomed = map.fitBounds(circle.getBounds());
        }

        map.setView([lat, lng]);

        // Send user location to the server
        sendLocationToServer(lat, lng, accuracy);
      } catch (error) {
        console.error('Error during Leaflet operations:', error);
      }
    };

    const error = (err) => {
      if (err.code === 1) {
        alert('Please allow geolocation access');
      } else {
        alert('Cannot get the current location');
      }
    };

    // Watch for geolocation changes
    const watchId = navigator.geolocation.watchPosition(success, error);

    // Fetch locations of logged-in users from the server
    // const fetchUserLocations = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3500/user-api/get-locations');
    //     const locations = response.data;

    //     // Display markers for each logged-in user
    //     locations.forEach((location) => {
    //       const { latitude, longitude, accuracy, userId } = location;
    //       const userMarker = L.marker([latitude, longitude]).addTo(map);
    //       userMarker.bindPopup(`User ${userId}<br>Accuracy: ${accuracy} meters`);
    //     });

    //     // Save user locations in the component state for potential future use
    //     //setUserLocations(locations);
    //   } catch (error) {
    //     console.error('Error fetching user locations:', error);
    //   }
    // };

    // // Call the fetchUserLocations function
    // fetchUserLocations();

    // Cleanup on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);

      if (map) {
        map.remove();
      }
    };

  }, []); // Add any dependencies as needed

  const sendLocationToServer = (latitude, longitude, accuracy) => {
    const apiUrl = 'http://localhost:3500/user-api/update-location';
    
    const username = user.username;
  
    // Data to be sent in the POST request
    const data = {
      username,
      latitude,
      longitude,
      accuracy,
    };
  
    // Making an Axios POST request to update user location
    axios.post(apiUrl, data)
      .then(response => {
        console.log('Location updated for user:', username);
      })
      .catch(error => {
        console.error('Error updating location:', error);
      });
  };

  //sendLocationToServer();

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '500px' }}></div>
    </div>
  );
}

export default Products