<template>
    <Modal v-model="insideModal" width="360">
        <p slot="header"
           style="text-align:center">
            <span>账号编辑</span>
        </p>
        <div style="text-align:center">
            <el-form ref="form" :model="formData" label-width="80px">
                <el-form-item label="账号:">
                    <el-input v-model="formData.account"></el-input>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>

            </el-form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large"  @click="insideModal = false">取消</Button>
            <Button type="success" size="large"  @click="save">保存</Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        name: "AccountEditor",
        computed: {},
        data() {
            return {
                formData: {},
                insideModal: false,
            }
        },
        methods: {
            show: function (bean) {
                this.formData = bean;
                this.insideModal = true;
            },
            // 保存数据
            save: function () {
                // 检查参数
                if (!this.formData.account){
                    this.$message.error('请输入账号');
                    return;
                }
                if (!this.formData.password){
                    this.$message.error('请输入密码');
                    return;
                }
                var list = this.$store.state.accountList;
                var has = false;
                for (let i = 0; i < list.length; i++) {
                    var bean = list[i];
                    var account = bean.account;
                    if (account === this.formData.account) {
                        // 更新
                        list[i] = this.formData;
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    list.push(this.formData);
                }
                this.$store.commit('setAccounts', list);
                this.insideModal = false;
            }
        }
    }
</script>

<style scoped>

</style>
