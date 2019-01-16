<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex flex xs10 sm10 md8 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="SMART SYSTEMS" width="82" height="94">
                  <h1 class="flex my-4 primary--text">SMART SYSTEMS</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="email"
                    placeholder="micorreo@empresa.com"
                    v-model="model.email"
                    v-validate="'required|email'"                    
                    :error-messages="errors.first('login')"
                    autofocus
                  />
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                    v-validate="'required'"
                    :error-messages="errors.first('password')"
                  />
                </v-form>                
                <v-alert outline type="error" :value="errorMessage">{{ errorMessage }}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" large @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>              
            </v-card>                            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    errorMessage: '',
    model: {
      email: 'admin@gmail.com',
      password: '123456'
    }
  }),

  methods: {

    async login() {      
      if (!await this.$validator.validateAll()) {
        return false;
      }     

      this.loading = true;
    
      this.$store.dispatch('login', this.model).then(() => {
        this.$router.push('/seleccion');
      })
      .catch((error) => {        
        // TODO: Cambiar a error.response.data.message en el backend    
        this.errorMessage = error.response.data.error;
        setTimeout(() => { 
          this.errorMessage = ''; 
            }, 4000); 
          })
      .finally(() => this.loading = false);
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
