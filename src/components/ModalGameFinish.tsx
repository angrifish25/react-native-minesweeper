import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modal, View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {GameState} from '../constants';
import {useGameContext} from '../contexts/GameContext';

const ModalGameFinish = ({reset}) => {
  const {finish} = useGameContext();
  const {height} = useWindowDimensions();
  return (
    <Modal
      animationType="slide"
      transparent
      visible={finish === GameState.ACTIVE ? false : true}
      onRequestClose={reset}
      onDismiss={reset}>
      <View style={[styles.modal, {marginTop: height / 2 - 100}]}>
        <Text style={styles.mainText}>
          {finish === GameState.WIN
            ? 'Победа!'
            : finish === GameState.LOOSE
            ? 'Вы проиграли!'
            : null}
        </Text>

        <TouchableOpacity style={styles.buttonNewGame} onPress={reset}>
          <Text style={styles.textButton}>Новая игра</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 32,
  },

  textButton: {
    color: '#F1F1F1',
    fontSize: 20,
  },
  buttonNewGame: {
    marginTop: 30,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#15A90A',
  },
  modal: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 50,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 8,
  },
});

export default ModalGameFinish;
