import React from 'react'
import { View } from 'react-native';

export const Backgrpund = () => {
  return (
    <View
        style={{
            position: 'absolute',
            backgroundColor: '#5856D6',
            top: -250,

            width: 678,
            height: 1200,
            transform: [
                { rotate: '-60deg' }
            ],
        }}
    />
  )
}
