import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import EventTableComponent from './EventTableComponent';

const DropdownComponent = ({ onSelect, onSelectEvent }) => {
  const [value, setValue] = useState(null);
  const [siteData, setSiteData] = useState([]);
  const [showEventTable, setShowEventTable] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  useEffect(() => {
    axios.get('http://172.30.44.13:5316/Site/GetAll')
      .then(response => {
        setSiteData(response.data.map(item => ({
          label: item.name,
          value: item.id
        })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (value) {
      axios.get(`http://172.30.44.13:5316/Venue/GetVenueListWithSiteId?siteId=${value}`)
        .then(response => {
          const firstVenue = response.data[0];
          if (firstVenue && firstVenue.id) {
            setSelectedSiteId(firstVenue.id);
            setShowEventTable(true);
          } else {
            console.error('Invalid venue or venue id.');
          }
        })
        .catch(error => {
          console.error('Error fetching venue list:', error);
        });
    }
  }, [value]);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  return (
    <View>
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={siteData}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Museum"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onSelect(item);
        setSelectedEvent(null);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={renderItem}
    />
       {showEventTable && selectedSiteId && (
         <EventTableComponent
         siteId={selectedSiteId}
         onSelectEvent={onSelectEvent}
         selectedEvent={selectedEvent}
         setSelectedEvent={setSelectedEvent} 
       />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40, 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedText: {
    color: '#ccc',
  }
});

export default DropdownComponent;
