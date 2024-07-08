import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const EventTableComponent = ({ siteId, onSelectEvent, selectedEvent, setSelectedEvent }) => {
  const [eventTableData, setEventTableData] = useState([]);

  useEffect(() => {
    if (siteId) {
      axios.get(`http://172.30.44.13:5316/Event/Event_Table?venueId=${siteId}`)
        .then(response => {
          setEventTableData(response.data);
        })
        .catch(error => {
          console.error('Error fetching event table:', error);
        });
    }
  }, [siteId]);

  const dropdownData = eventTableData.map(item => ({
    label: item.name,
    value: item.id 
  }));

  const handleEventSelect = (value) => {
    console.log("Selected Event",value); 
    onSelectEvent(value);
    setSelectedEvent(value);
  };

  return (
    <View>
      {dropdownData.length > 0 ? (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Select Event"
          value={selectedEvent}
          onChange={(value) => handleEventSelect(value)}
        />
      ) : (
        <Text>No event data available</Text>
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedText: {
    color: '#ccc',
  },
});

export default EventTableComponent;
