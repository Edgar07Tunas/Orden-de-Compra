import React, {Component} from 'react';

class App extends Component{
    constructor(){
        super();
        this.state = {
            _id:'',
            no_control:'',
            no_orden:'',
            fecha:'',
            no_proce:'',
            fecha_limite:'',
            no_solicitud_com:'',

            partido_pre:'',
            uni_me:'',
            canti_soli:'',
            precio:'',
            importe:'',
            descrip:'',

            ordenes: []
        };
        this.handleChange =this.handleChange.bind(this);
        this.addOrden = this.addOrden.bind(this);
    }

    addOrden(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res =>res.json())
            .then(data =>{
                console.log(data);
                M.toast({html:'Orden Actualizada'});
                this.setState({
                    partido_pre:'',
                    uni_me:'',
                    canti_soli:'',
                    precio:'',
                    importe:'',
                    descrip:''
                });
                this.fetchOrdenes();
            })
        }
        else{
        fetch('/api/tasks',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data=>{
                console.log(data)
                M.toast({html:'Orden Guardada'});
                this.setState({
                    partido_pre:'',
                    uni_me:'',
                    canti_soli:'',
                    precio:'',
                    importe:'',
                    descrip:''
                })
                this.fetchOrdenes();
            })
            .catch(err => console.error(err));
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchOrdenes();
    }

    fetchOrdenes(){
        fetch('/api/tasks')
            .then(res=>res.json())
            .then(data =>{
                this.setState({ordenes: data});
                console.log(this.state.ordenes)
            })
    }

    deleteOrden(_id){
        if(confirm('Deseas ELIMINAR esta Orden')){
            fetch(`/api/tasks/${_id}`,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                M.toast({html:'Orden Eliminada'})
                this.fetchOrdenes();
            })
        }
    }

    editOrden(_id){
        fetch(`/api/tasks/${_id}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                this.setState({
                    _id:data._id,
                    partido_pre:data.partido_pre,
                    uni_me:data.uni_me,
                    canti_soli:data.canti_soli,
                    precio:data.precio,
                    importe:data.importe,
                    descrip:data.descrip
                })
            });
    }

    handleChange(e){ 
        const {name,value}= e.target;
        this.setState({
            [name]:value
        })
    }
    
    render(){
        function mul(x,y){
            return(x*y);
        }

        
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.datepicker');
            var instances = M.Datepicker.init(elems, {});
            
        });
         

        return(
            <div>
                {/*Navegador*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Orden de Compra</a>
                    </div>
                </nav>  

                <div className="">
                    <div className="row">
                        <div className="col s3">
                            <div className="card">
                                <div className="card-content">
                                    <div>
                                        {/*-----*/}
                                        <div className="row">
                                            <h6>*Datos del Proveedor</h6>
                                            <dl>
                                                <dd className="text-left">-Proveedor:</dd>
                                                <hr/>
                                                <dd className="text-left">-Domicilio:</dd>
                                                <hr/>
                                                <dd className="text-left">-Telefono:</dd>
                                                <hr/>
                                                <dd className="text-left">-Email:</dd>
                                                <hr/>
                                            </dl>
                                        </div>
                                    </div>
                                    <form onSubmit={this.addOrden}>
                                        {/*Formulario*/}
                                        <div className="row">
                                            <h6>Datos de la Orden</h6>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s5">
                                                <input
                                                name="no_control"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="No.Control"
                                                value={this.state.no_control}/>
                                            </div>
                                            <div className="input-field col s7">
                                                <input
                                                name="no_orden"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="No.Orden de Suministro"
                                                value={this.state.no_orden}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s5">
                                                <input
                                                className="datepicker"
                                                name="fecha"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Fecha"
                                                value={this.state.fecha}/>
                                            </div>
                                            <div className="input-field col s7">
                                                <input
                                                name="no_proce"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="No.Procedimeinto"
                                                value={this.state.no_proce}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s5">
                                                <input
                                                className="datepicker"
                                                name="fecha_limite"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Fecha limite"
                                                value={this.state.fecha_limite}/>
                                            </div>
                                            <div className="input-field col s7">
                                                <input
                                                name="no_solicitud_com"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="No.Solicitos de Compra"
                                                value={this.state.no_solicitud_com}/>
                                            </div>
                                        </div>
                                        {/*-----*/}
                                        <div className="row">
                                        <h6>Orden</h6>
                                            <div className="input-field col s6">
                                               <input
                                                name="partido_pre" 
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Partido Presupuestal"
                                                value={this.state.partido_pre}/> 
                                            </div>
                                            <div className="input-field col s6">
                                                <input
                                                name="uni_me"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Unidad de Medida"
                                                value={this.state.uni_me}/>        
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input
                                                name="canti_soli"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Cantidad Solicitada"
                                                value={this.state.canti_soli}/>
                                            </div>
                                            <div className="input-field col s6">
                                                <input
                                                name="precio"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Precio Unitario"
                                                value={this.state.precio}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                            <input
                                                name="importe"
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Impoprte"
                                                value={this.state.importe = mul(this.state.canti_soli,this.state.precio)}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                               <textarea
                                               name="descrip"  
                                               placeholder="Descripcion"
                                               onChange={this.handleChange} 
                                               className="materialize-textarea"
                                               value={this.state.descrip}>
                                                </textarea> 
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Guardar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/*Mostrar Tabla*/}
                        <div className="col s9">
                            <table>
                                <thead>
                                    <th>No.</th>
                                    <th>Partida Prosupuestal</th>
                                    <th>Descripcion</th>
                                    <th>Unidad de Medida</th>
                                    <th>Cantidad Solicitada</th>
                                    <th>Precio unitario sin IVA</th>
                                    <th>Importe sin IVA</th>
                                    <th>Editor</th>
                                </thead>
                                <tbody>
                                    {
                                        this.state.ordenes.map((orden,i) =>{
                                            return(
                                                <tr key={orden._id}>
                                                    <td>{i+1}</td>
                                                    <td>{orden.partido_pre}</td>
                                                    <td>{orden.descrip}</td>
                                                    <td>{orden.uni_me}</td>
                                                    <td>{orden.canti_soli}</td>
                                                    <td>{orden.precio}</td>
                                                    <td>{orden.importe}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" 
                                                                style={{margin:'4px'}}
                                                                onClick={()=> this.deleteOrden(orden._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4"
                                                                style={{margin:'4px'}}
                                                                onClick={()=> this.editOrden(orden._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default App;