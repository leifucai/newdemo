export default{
    state:{
        person:false,
        usertable:false,
        print:false,
        layer:false,
        legend:true,
    },
    mutations:{
        changedialog(state){
            state.person = !state.person
            state.usertable = false
            state.print = false
            state.layer = false
            state.legend = false
        },
        changeusertable(state){
            state.usertable = !state.usertable
            state.person = false
            state.print = false
            state.layer = false
            state.legend = false
        },
        changeprint(state){
            state.print = !state.print
            state.person = false
            state.usertable = false
            state.layer = false
            state.legend = false
        },
        changelayer(state){
            state.layer = !state.layer
            state.person = false
            state.usertable = false
            state.print = false
        },
        changelegend(state){
            state.legend = !state.legend
            state.person = false
            state.usertable = false
            state.print = false
        },
        closeall(state){
            state.usertable = false
            state.person = false
            state.print = false
            state.layer = false
        }
    }
}