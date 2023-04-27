import {redux} from "redux";
import React from "react";
import axios from "axios";
import shallow from "jest";
import Home from "../components/Home/Home"
import { 
    FILTER_BY_CONTINENTS, 
    ORDER_COUNTRIES_NAME, 
    ORDER_COUNTRIES_POP,
    FILTER_BY_ACTIVITY
} from "../redux/actions";

// Tests de filtros por continent, poblacion, nombre y actividad funcionan bien y muestran en consecuencia. 
it("test_home_filters_work", () => {
    const dispatchMock = jest.fn();
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    useSelectorMock.mockReturnValueOnce([{id: 1, name: "Argentina", continent: "South America"}]);
    useSelectorMock.mockReturnValueOnce([{id: 1, name: "Hiking"}]);
    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockReturnValueOnce(["", jest.fn()]);
    useStateMock.mockReturnValueOnce([{continent:"", population:"", name:"", activity:""}, jest.fn()]);
    useStateMock.mockReturnValueOnce([{continent:"", population:"", name:"", activity:""}, jest.fn()]);
    useStateMock.mockReturnValueOnce([1, jest.fn()]);
    useStateMock.mockReturnValueOnce([10, jest.fn()]);
    const axiosMock = jest.spyOn(axios, 'get');
    axiosMock.mockResolvedValueOnce({data: [{id: 1, name: "Argentina", continent: "South America"}]});
    axiosMock.mockResolvedValueOnce({data: [{id: 1, name: "Hiking"}]});
    const wrapper = shallow(<Home />);
    wrapper.find('select').at(0).simulate('change', {target: {value: 'South America'}});
    expect(dispatchMock).toHaveBeenCalledWith({type: FILTER_BY_CONTINENTS, payload: 'South America'});
    expect(wrapper.find('Card').prop('name')).toEqual('Argentina');
    wrapper.find('select').at(1).simulate('change', {target: {value: 'asc'}});
    expect(dispatchMock).toHaveBeenCalledWith({type: ORDER_COUNTRIES_NAME, payload: 'asc'});
    expect(wrapper.find('Card').prop('name')).toEqual('Argentina');
    wrapper.find('select').at(2).simulate('change', {target: {value: 'bigPop'}});
    expect(dispatchMock).toHaveBeenCalledWith({type: ORDER_COUNTRIES_POP, payload: 'bigPop'});
    expect(wrapper.find('Card').prop('name')).toEqual('Argentina');
    wrapper.find('select').at(3).simulate('change', {target: {value: 'Hiking'}});
    expect(dispatchMock).toHaveBeenCalledWith({type: FILTER_BY_ACTIVITY, payload: 'Hiking'});
    expect(wrapper.find('Card').prop('name')).toEqual('Argentina');
    });