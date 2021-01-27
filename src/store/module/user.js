/*
    用户数据
*/
import { myUser } from '@/api/getData'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router'

const user = {
    state: {
        token: getToken('token')
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },
    actions: {
        //登录
        myLogin({ commit }, userInfo) {
            const username = userInfo.user.trim();
            return new Promise((resolve, reject) => {
                myUser.loginIn({ userName: username, password: userInfo.password }).then(res => {
                    if (res.success) {
                        const data = res.data;
                        const tokenStr = data.Token;
                        setToken('token', tokenStr);
                        commit('SET_TOKEN', tokenStr);
                        router.push('/');
                        Message.success('登录成功')
                    } else {
                        Message.error(res.msg);
                    }
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    removeToken('token');
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },

    }
}

export default user;