import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

class Movie  extends React.Component {

    constructor() {
        super()
        this.state = {
            data:"",
        }
        //console.log('construtor')
    }

    componentDidMount() {
        //console.log('componentdidmount')
        this.apiCall()
    }

   async apiCall() {
        let response = await fetch("https://facebook.github.io/react-native/movies.json")
        let responseJson = await response.json()
        //console.log(responseJson)
        this.setState({data:responseJson.movies})
    }

    componentDidUpdate() {
        //console.log('componentDidUpdate')
    }

    render() {
        //console.log('render')
        const { navigation } = this.props;

        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.data}
                    renderItem = {({item, index}) => 
                        <TouchableOpacity onPress = { ()=> 
                            navigation.navigate('Details', {
                                movieTitle: item.title,
                                releaseYear: item.releaseYear,
                                movieImage: moviesURL[index],
                                myBackgroundColor: colors[index % colors.length]
                            })
                        }>
                            <View style = {{
                                alignItems: 'center',
                                justifyContent: 'center', 
                                height: 200, 
                                backgroundColor: colors[index % colors.length]
                            }}>
                                <Text style = {{color: '#fff' , fontSize: 40}}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor = {item => item.id}
                />
            </SafeAreaView>
        )
    }
}

const colors = ['#808080', '#000000']
const moviesURL = [
    'https://cdn.pocket-lint.com/r/s/1200x/assets/images/147767-tv-feature-what-order-should-you-watch-all-the-star-wars-films-image1-1wdfjceytb.jpg',
     'https://images.squarespace-cdn.com/content/v1/5c62c09c4d546e27dc1016c7/1558007395695-IBEQBOGQRZBM35QEOQUY/ke17ZwdGBToddI8pDm48kPJXHKy2-mnvrsdpGQjlhod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmihaE5rlzFBImxTetd_yW5btdZx37rH5fuWDtePBPDaHF5LxdCVHkNEqSYPsUQCdT/Back+to+the+Future+The+Musical+Instagram.jpg?format=500w', 
     'https://static.wikia.nocookie.net/superheroes/images/6/64/4134793-neo%2Bof%2Bmatrix.jpg/revision/latest/scale-to-width-down/340?cb=20171029015857', 
     'https://s.yimg.com/lo/api/res/1.2/G46xps5z35XFyXm1z.mzeg--/YXBwaWQ9YXBlY21lZGlhO3NtPTE7dz04MDA-/https://media.zenfs.com/en/the_hive_asia_947/2abad3c599b92fca6e8ce023340a206c', 
     'https://www.newstatesman.com/sites/default/files/styles/cropped_article_image/public/blogs_2014/11/2014_44_interstellar_film_still.jpg?itok=k0YgBmLF']

export default function MoviesScreen() {
    const navigation = useNavigation();
  
    return <Movie navigation={navigation} />;
  }
