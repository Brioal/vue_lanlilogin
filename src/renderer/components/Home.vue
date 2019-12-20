<template>
    <div style="text-align: center;padding: 20px">
        <!--当前状态-->
        <el-button type="success" icon="el-icon-check" circle style="font-size: 50px" v-if="state===1"></el-button>
        <el-button type="danger" icon="el-icon-warning-outline" circle style="font-size: 50px"
                   v-if="state===0"></el-button>
        <p style="margin: 5px;font-size: 16px">{{stateTitle}}</p>
        <i class="el-icon-refresh pointer" style="font-size: 25px;margin-top: 15px;" @click="getState()"></i>
        <!--        操作按钮-->
        <div style="margin-top: 15px">
            <el-button type="success" round style="width: 200px" v-if="state===0" @click="login" :loading="loading">登录
            </el-button>
            <el-button type="danger" round style="width: 200px" v-if="state===1" @click="loginOut" :loading="loading">
                注销
            </el-button>

        </div>
        <!--        账号选择-->
        <p style="font-size: 15px;margin-top: 10px">账号列表:</p>
        <el-button size="mini" type="primary" @click="showAdd">添加</el-button>
        <div style="margin-top: 10px">
            <div v-for="(bean,index) in accountList" style="font-size: 14px">
                <el-radio v-model="currentIndex" :label="index" border style="margin: 3px">{{bean.account}} <i
                        class="el-icon-edit pointer" @click="handleEdit(bean)"></i> <i
                        class="el-icon-delete pointer" @click="handleDelete(index)"></i></el-radio>
            </div>
        </div>
        <!--        编辑器-->
        <AccountEditor
                ref="account_editor"
        />
<!--        删除确认-->
        <Modal v-model="showDeleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>是否删除此账号?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="del">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import AccountEditor from "./AccountEditor";

    export default {
        name: "Home",
        components: {AccountEditor},
        data() {
            return {
                state: 0,
                currentIndex: 0,
                loading: false,
                showDeleteModal:false,
                deleteIndex:0
            }
        },
        computed: {
            stateTitle: function () {
                switch (this.state) {
                    case 0:
                        return '未登录';
                    case 1:
                        return '已登录';
                }
            },
            accountList: function () {
                return this.$store.state.accountList;

            },

        },
        watch: {
            currentIndex: function () {
                this.$store.commit('setSelectIndex', this.currentIndex);
            }
        },
        created() {
            this.currentIndex = this.$store.state.selectAccountIndex;
            this.refresh();
        },
        methods: {
            handleDelete:function(index){
              this.deleteIndex = index;
              this.showDeleteModal = true;
            },
            del: function () {
                var list = this.accountList;
                list.splice(this.deleteIndex,1);
                this.showDeleteModal = false;
                this.currentIndex = 0;
            },
            showAdd: function () {
                this.$refs.account_editor.show({});
            },
            handleEdit: function (bean) {
                this.$refs.account_editor.show(bean);
            },
            refresh: function () {
                this.getState();
            },
            // 获取网页状态
            getState: function () {
                console.log('刷新状态')
                var that = this;
                this.$http.get('http://10.126.1.30/', {}).then(function (res) {
                    var html = res.data;
                    console.log('状态数据:', html);
                    if (html.indexOf('注销页') !== -1) {
                        that.state = 1;
                    } else {
                        that.state = 0;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            login: function () {
                console.log('登录');
                // 获取用户信息
                var bean = this.accountList[this.currentIndex];
                var account = bean.account;
                var password = bean.password;
                var that = this;
                this.loading = true;
                var url = 'http://10.126.1.30/login?DDDDD=' + account + '&upass=' + password + '&R1=0&R2=&R3=0&R6=0&para=00&0MKKey=123456&buttonClicked=&redirect_url=&err_flag=&username=&password=&user=&cmd=&Login=&v6ip='
                this.$http.get(url, {}).then(function (res) {
                    that.loading = false;
                    var html = res.data;
                    console.log('登录结果数据:', html);
                    if (html.indexOf('认证成功页') !== -1) {
                        that.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        that.state = 1;
                    } else {
                        that.$message.error('登录失败,请检查账号密码');
                        that.state = 0;
                    }
                    that.refresh();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            loginOut: function () {
                console.log('注销');
                var that = this;
                this.loading = true;
                var url = 'http://10.126.1.30/F.htm'
                this.$http.get(url, {}).then(function (res) {
                    that.loading = false;
                    var html = res.data;
                    console.log('注销结果数据:', html);
                    that.$message({
                        message: '注销成功!',
                        type: 'success'
                    });
                    that.refresh();
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
