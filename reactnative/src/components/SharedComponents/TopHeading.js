import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../../compLib'
import useFont from '../../SharedHooks/useFont'


const TopHeading = (props) => {
  const { title, subtitle } = props
  const { fontLoaded } = useFont('Lemon-Regular')

  const moreThanOneLine = title.split(' ').length > 1

  return (
    <View style={ styles.container }>
      { fontLoaded ?  (
        <View>
            <Typography color='primary' size={moreThanOneLine ? 'xxl' : 'title'} >{title}</Typography>
            { subtitle && 
                <View>
                    <Typography color='primary' size='subtitle'>{subtitle}</Typography>
                </View>
            }
        </View>
      ) : (
        <View>
          <Typography color='primary' size={moreThanOneLine ? 'xxl' : 'title'} >{title}</Typography>
          { subtitle && 
              <View>
                  <Typography color='primary' size='subtitle'>{subtitle}</Typography>
              </View>
          }
        </View>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    marginTop: 40,
  },
})

export default TopHeading