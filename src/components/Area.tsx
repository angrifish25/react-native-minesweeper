import React, {useMemo} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AreaContextProvider} from '../contexts/AreaContext';
import useArea from '../hooks/useArea';
import Block from './Block';
import ModalGameFinish from './ModalGameFinish';
import {IAreaCell} from '../types';

const Area = () => {
  const {bombs, area, reset, onPressBlock, onSetFlag} = useArea();
  const areaKeys = useMemo<[string, IAreaCell][]>(
    () => Object.keys(area).map(key => [key, area[key]]),
    [area],
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 20}}>💣: {bombs}</Text>
        <TouchableOpacity style={{marginTop: 0}} onPress={reset}>
          <Text style={styles.btnReload}>Перезагрузить</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.area}>
        <AreaContextProvider value={{onPressBlock, onSetFlag}}>
          {areaKeys.map(([key, item]) => (
            <Block key={key} {...item} />
          ))}
        </AreaContextProvider>
      </View>
      <ModalGameFinish reset={reset} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  container: {
    marginTop: 60,
    flex: 1,
  },
  btnReload: {
    fontSize: 28,
  },
  area: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  block: {
    borderColor: '#979797',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Area;
