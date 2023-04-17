import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GameState} from '../constants';
import {useGameContext} from '../contexts/GameContext';

const ControllPanel = () => {
  const {finish, setFinish} = useGameContext();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => {
    if (finish === GameState.LOOSE || finish === GameState.WIN) {
      return ['30%', '60%'];
    }

    return ['30%'];
  }, [finish]);
  useEffect(() => {
    if (
      snapPoints.length > 1 &&
      (finish === GameState.LOOSE || finish === GameState.WIN)
    ) {
      setTimeout(() => bottomSheetRef.current?.snapToIndex(1));
    } else if (finish === GameState.ACTIVE) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [snapPoints, finish]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      backgroundStyle={{
        backgroundColor: '#D4D4D4',
      }}
      handleStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#D4D4D4',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => setFinish(-1)}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ControllPanel;
