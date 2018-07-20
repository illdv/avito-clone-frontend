import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IUserActions, UserActions } from 'client/common/user/actions'
import { bindModuleAction } from 'client/common/user/utils'


interface IState {
    passwordFields: IChangePasswordRequest
}

interface IProps {
    userActions: IUserActions
}

export class ProfileSettings extends React.Component<IProps, IState> {
    state            = {
        passwordFields: {
            old_password: '',
            password: '',
            password_confirmation: '',
        }
    };
    onChange = event => {
        const { id, value } = event.target;
        this.setState({
            passwordFields: { ...this.state.passwordFields, [id]: value },
        });
    }

    onPasswordChange = () => {
        const {old_password, password, password_confirmation} = this.state.passwordFields;
        this.props.userActions.changePassword.REQUEST({old_password, password, password_confirmation});
    }

    render() {
        return (
            <>
                <div className="profile-info">
                    <h5>Contact Information</h5>
                    <p>The photo</p>
                    <div className="account__person">
                        <img
                            src="/static/img/person.png"
                            alt=""
                            className="account__img account__img_big"
                        />
                    </div>
                    <form>
                        <div className="form-group row">
                            <label
                                htmlFor="full-name"
                                className="col-sm-2 col-form-label profile-info__label"
                            >Full name</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="full-name"
                                    placeholder="Full name"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="city"
                                className="col-sm-2 col-form-label profile-info__label"
                            >City</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="City"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="email"
                                className="col-sm-2 col-form-label profile-info__label"
                            >Email</label>
                            <div className="col-sm-4">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="phone"
                                className="col-sm-2 col-form-label profile-info__label"
                            >Phone</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="+987 654 321 000"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <a className="btn button button_bright-outline profile-info__button">Save</a>
                        </div>
                    </form>
                </div>
                <div className="profile-info">
                    <h5>Change Password</h5>
                    <p>Enter your current password, new password, and re-enter the new password to exclude the
                        possibility of a typo.</p>
                    <form>
                        <div className="form-group row">
                            <label
                                htmlFor="current-password"
                                className="col-sm-3 col-form-label profile-info__label"
                            >Current password</label>
                            <div className="col-sm-4">
                                <input
                                    type="password"
                                    name="old_password"
                                    className="form-control"
                                    id="old_password"
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="new-password"
                                className="col-sm-3 col-form-label profile-info__label"
                            >New password</label>
                            <div className="col-sm-4">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="confirm-password"
                                className="col-sm-3 col-form-label profile-info__label"
                            >Confirm password</label>
                            <div className="col-sm-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <a className="btn button button_bright-outline profile-info__button"
                               onClick={this.onPasswordChange}>Save</a>
                        </div>
                    </form>
                </div>
                <div className="profile-info">
                    <h5>Customize notifications</h5>
                    <p>Ads have the right to send system notifications to the user without the possibility of
                        unsubscribing from them.</p>
                    <div className="notification-control">
                        <div>
                            <h6 className="notification-control__title">Personal Collections</h6>
                            <p>Collections of interesting ads and categories</p>
                        </div>
                        <div className="switch-button">
                            <input
                                className="switch-button__input"
                                type="checkbox"
                                id="personal-collections"
                            />
                            <label
                                className="switch-button__label"
                                htmlFor="personal-collections"
                            > </label>
                        </div>
                    </div>
                    <div className="notification-control">
                        <div>
                            <h6 className="notification-control__title">Posts</h6>
                            <p>Notifications for new messages in the messenger</p>
                        </div>
                        <div className="switch-button">
                            <input
                                className="switch-button__input"
                                type="checkbox"
                                id="posts"
                            />
                            <label
                                className="switch-button__label"
                                htmlFor="posts"
                            > </label>
                        </div>
                    </div>
                    <div className="notification-control">
                        <div>
                            <h6 className="notification-control__title">Promotions</h6>
                            <p>Individual discounts and special offers</p>
                        </div>
                        <div className="switch-button">
                            <input
                                className="switch-button__input"
                                type="checkbox"
                                id="promotions"
                            />
                            <label
                                className="switch-button__label"
                                htmlFor="promotions"
                            > </label>
                        </div>
                    </div>
                    <div className="notification-control">
                        <div>
                            <h6 className="notification-control__title">Participation in research</h6>
                            <p>Based on your answers, we will make Ads better</p>
                        </div>
                        <div className="switch-button">
                            <input
                                className="switch-button__input"
                                type="checkbox"
                                id="participation-in-research"
                            />
                            <label
                                className="switch-button__label"
                                htmlFor="participation-in-research"
                            > </label>
                        </div>
                    </div>
                    <div className="notification-control">
                        <div>
                            <h6 className="notification-control__title">News</h6>
                            <p>Information about the company and new functions Ads</p>
                        </div>
                        <div className="switch-button">
                            <input
                                className="switch-button__input"
                                type="checkbox"
                                id="news"
                            />
                            <label
                                className="switch-button__label"
                                htmlFor="news"
                            > </label>
                        </div>
                    </div>
                    <div className="notification-control">
                        <div>
                            <h6 className="notification-control__title">Tips from Ads</h6>
                            <p>Recommendations for effective work with the site</p>
                        </div>
                        <div className="switch-button">
                            <input
                                className="switch-button__input"
                                type="checkbox"
                                id="tips-from-ads"
                            />
                            <label
                                className="switch-button__label"
                                htmlFor="tips-from-ads"
                            > </label>
                        </div>
                    </div>
                </div>
                <div className="profile-info">
                    <h5>Account deleting</h5>
                    <p>If you want to permanently delete your account and all your ads, click on the "Delete account"
                        button.</p>
                    <div className="text-center">
                        <a className="btn button button_bright-outline profile-info__button">Delete account</a>
                    </div>
                </div>
            </>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    userActions: bindModuleAction(UserActions, dispatch),
});

export default connect(null, mapDispatchToProps)(ProfileSettings);