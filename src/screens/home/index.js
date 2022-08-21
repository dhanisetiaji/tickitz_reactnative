import React, { useEffect, useState } from 'react'
import { RefreshControl, SectionList } from 'react-native'
import FooterComponent from '../../components/Footer'
import HeaderComponent from '../../components/Header'
import BannerSection from './Banner'
import JoiningSection from './Joining'
import NowShowingSection from './NowShowing'
import UpComingSection from './Upcoming'
import { GetMovies } from '../../redux/actions/Movies'
import { useSelector, useDispatch } from 'react-redux'
import NetworkModal from '../../components/Network'



const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [refetch, setRefetch] = useState(false),
        [params, setParams] = useState({
            limit: 10,
            orderBy: 'asc',
        })

    const { loading } = useSelector(state => state.movies)
    const { isOffline } = useSelector(state => state.statusnetwork)



    useEffect(() => {
        dispatch(GetMovies(params))
    }, [dispatch, refetch, isOffline])




    return (<>
        <NetworkModal />
        <HeaderComponent />
        <SectionList
            refreshControl={<RefreshControl refreshing={loading}
                onRefresh={() => { setRefetch(!refetch) }} />}
            style={{ backgroundColor: '#fff' }}
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={() => {
                return (<>
                    <BannerSection />
                    <NowShowingSection navigation={navigation} />
                    <UpComingSection navigation={navigation} />
                    <JoiningSection />
                </>)

            }}
        />
    </>)
}

export default HomeScreen