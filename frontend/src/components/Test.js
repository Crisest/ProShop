import React, { useEffect } from 'react'
import { connect }           from 'react-redux'
import { formValueSelector } from 'redux-form'

import { en }                from '../../utils/languages'
import { EmptyList }         from '../../utils/emptyList'
import { loadResources }     from '../../actions/resourceActions'
import { switchView, 
        viewTypes }          from '../../actions/viewActions'
import { setPage }           from '../../actions/pageActions'
import { toggleCreateModal,
         resourceModalData } from '../../actions/modalActions'
import Loading               from '../Loading/Loading'
import Pages                 from '../Pages/Pages'
import Header                from '../Header/Header'
import DataList              from '../DataList/DataList'
import DataListItem          from '../DataList/DataListItem/DataListItem'
import OnSchedSearch         from '../OnSchedSearch/OnSchedSearch'

import './Resources.css'


const Resources = props => {
    const {
        loadResources,
        selected,
        switchView,
        setPage,
        resources, 
        loading, 
        success, 
        toggleCreateModal,
        page,
        searchText,
    } = props
    
    const limit = 10
    const offset = page === 1 ? 0 : (page - 1) * 10

    useEffect(() => {
        switchView(viewTypes.resources)
        setPage(1) 

        if( selected ){
            loadResources({ locationId: selected.id, offset, limit })
        }
    }, [])

    useEffect(() => {
        if (selected) {

            loadResources({ locationId: selected.id, offset, limit })
        }
    }, [ selected ])

    const handleListAction = offset => {

        loadResources({locationId: selected.id, limit, offset, name: searchText})
    }
    
    let itemTitles = en.resources.itemTitles

    let list = []
    if(resources) list = resources.data.map((resource, i) => {
      let authorized = '--'
      let email      = '--'
      let timezone   = '--'
      if (resource.googleCalendarAuthorized) authorized  = 'Google'
      if (resource.outlookCalendarAuthorized) authorized = 'Outlook'
      if (resource.email) email = resource.email
      if (resource.timezoneOffset) timezone = resource.timezoneOffset
      
      let data = {
        "img"   : resource.imageUrl,
        "name"  : resource.name,
        "cells" : [
          {
            "title" : itemTitles[0],
            "cell"  : email
          },
          {
            "title" : itemTitles[1],
            "cell"  : authorized
          },
          {
            "title" : itemTitles[2],
            "cell"  : resource.id
          }
        ]
      }
      
      return <DataListItem key={i} resource={resource} data={data} />
    })

    let dataList = <EmptyList type={en.resources.resource} />
    if ( resources && resources.total > 0 ) dataList = <DataList itemTitles={itemTitles} list={list} />
    
    return (
        <div className="Resources">
          <Header 
            title={en.resources.header} 
            cta={en.ctas.create}
            action={() => toggleCreateModal(resourceModalData, true)} 
          />
          <OnSchedSearch 
            object="resources" 
            action={loadResources}
            fields={[]}
            placeholder='Search by name or email'
          />
  
          {loading ? <Loading /> : (
              <>
                { dataList }
                <Pages 
                    total={resources.total}
                    isLoading={loading}
                    success={success}
                    listAction={handleListAction}
                />
              </>
          )}
        </div>
      )
}


const mapStateToProps = state => ({
    selected:   state.selectedLocation.selectedLocation,
    modal:      state.createModal,
    resources:  state.resources.resources,
    success:    state.resources.success,
    page:       state.page.page,
    loading:    state.resources.isLoading ||
                !state.resources.resources ||
                state.resourceDeleted.isLoading ||
                !state.selectedLocation.selectedLocation,
    searchText: formValueSelector('onsched-search')(state, 'searchText')
  })
  
  export default connect( 
    mapStateToProps, 
    { 
      loadResources, 
      switchView, 
      toggleCreateModal,
      setPage 
    } 
  )(Resources)
  