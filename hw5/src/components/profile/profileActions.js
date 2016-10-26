import Action, { updateError, resource } from '../../actions'

export function updateHeadline(headline) {
    return (dispatch) => {
        dispatch(updateField('headline', headline))
    }
}

export function fetchProfile() {
    return (dispatch) => {
        dispatch(fetchField('avatars'))
        dispatch(fetchField('zipcode'))
        dispatch(fetchField('email'))
        dispatch(fetchField('dob'))
    }
}


function updateField(field, value) {
    return (dispatch) => {
        if (value) {
            const payload = {}
            payload[field] = value
            resource('PUT', field, payload).then((response) => {
                const action = { type: Action.UPDATE_PROFILE }                
                action[field] = response[field]
                if (field == 'password')
                    dispatch(updateError('will not change password'))
                else
                    dispatch(action)
            })
        }
    }
}


function fetchField(field) {
    return (dispatch) => {
        resource('GET', field).then((response) => {
            const action = { type: Action.UPDATE_PROFILE }
            switch(field) {
                case 'avatars':
                    action.avatar = response.avatars[0].avatar; break;
                case 'email':
                    action.email = response.email; break;
                case 'zipcode':
                    action.zipcode = response.zipcode; break;
                case 'dob':
                    action.dob = new Date(response.dob).toDateString(); break;
            }
            dispatch(action)
        })
    }
}


/** WEBPACK FOOTER **
 ** ./src/components/profile/profileActions.js
 **/