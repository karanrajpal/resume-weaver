import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

import ConnectedResume from './ResumeSwitch';
import { setResumeJson, loadInitialState, setResumeLayout, setControl, setSaveMenuOpen } from '../state/actions';
import { ResumeData } from '../../types';
import { Save } from './Save';

type ToolbarProps = {
    controls: {};
    loadInitialState: () => void;
    setResumeLayout: (layout: string) => void;
    setControl: (controlKey: string, controlValue: string) => void;
    setSaveMenuOpen: (isOpen: boolean) => void;
};

const Toolbar = ({ controls = {}, setSaveMenuOpen, setControl, loadInitialState, setResumeLayout }: ToolbarProps) => (
    <nav>
        <div className='nav-container resume-editor__toolbar'>
            <div className='nav-logo'>
                <a href="/">resumeWeaver</a>
            </div>
            <ul className='nav-links'>
                <li className='dropdown'>
                    <a>Layout</a>
                    <ul className='menu'>
                        <li><a onClick={() => setResumeLayout('single')}>Single Column</a></li>
                        <li><a onClick={() => setResumeLayout('single-compact')}>Single Column Compact</a></li>
                        <li><a onClick={() => setResumeLayout('double')}>Double Column</a></li>
                    </ul>
                </li>
                <li className='dropdown'>
                    <a>Colors</a>
                    <ul className='menu'>
                        <li className='menu-item'>
                            <span>Primary</span>
                            <input type='text' value={controls['primaryColor']} onChange={(e) => setControl('primaryColor', e.target.value)} />
                            <span className='selected-color' title='Type in hex-code' style={{ backgroundColor: controls['primaryColor'] }} ></span>
                        </li>
                        <li className='menu-item'>
                            <span>Secondary</span>
                            <input type='text' value={controls['secondaryColor']} onChange={(e) => setControl('secondaryColor', e.target.value)} />
                            <span className='selected-color' title='Type in hex-code' style={{ backgroundColor: controls['secondaryColor'] }} ></span>
                        </li>
                    </ul>
                </li>
                <li><a onClick={() => {
                    const confirm = window.confirm('Reset back to original resume data?');
                    confirm && loadInitialState();
                }}>Reset</a></li>
                <a onClick={() => {
                    console.log('Save to Arweave Modal');
                    setSaveMenuOpen(true);
                }}>Save</a>
                <li><Link className='btn btn-link btn-small' to='/resume'>View</Link></li>
            </ul>
        </div>
    </nav>
);

const ConnectedToolbar = connect(
    (state: ResumeData) => ({
        controls: state.controls,
        arweaveState: state.arweave,
    }),
    (dispatch) => ({
        loadInitialState: () => dispatch(loadInitialState()),
        setResumeLayout: (resumeLayoutKey) => dispatch(setResumeLayout(resumeLayoutKey)),
        setControl: (controlKey, controlValue) => dispatch(setControl(controlKey, controlValue)),
        setSaveMenuOpen: (open) => dispatch(setSaveMenuOpen(open)),
    })
)(Toolbar);

type ResumeEditorProps = {
    resumeJson: Record<string, any>;
    menuOpen: boolean;
    setResumeJson: (resumeJson: Record<string, any>) => void;
};

const ResumeEditor = (props: ResumeEditorProps) => {
    const onChange = (resumeJson) => {
        try {
            resumeJson = JSON.parse(resumeJson);
            props.setResumeJson(resumeJson);
        } catch (e) {
            // do nothing
        }
    }

    const { resumeJson, menuOpen = false } = props;
    const resumeJsonString = JSON.stringify(resumeJson, null, 2);
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    return (
        <div className='resume-editor'>
            <ConnectedToolbar />
            <div className='resume-split-screen'>
                <div className='resume-editor__json'>
                    <AceEditor
                        mode="json"
                        theme="monokai"
                        name="code-editor"
                        onChange={onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={resumeJsonString}
                        height={'100%'}
                        width={'100%'}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    />
                </div>
                <ConnectedResume
                    previewMode={true}
                />
            </div>
            {menuOpen ? <ReactModal
                isOpen={menuOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setSaveMenuOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Save />
            </ReactModal> : null}
        </div>
    );
};

const ConnectedResumeEditor = connect(
    (state: ResumeData) => ({
        resumeJson: state.resumeJson,
        menuOpen: state.arweave.menuOpen,
    }),
    (dispatch) => ({
        setResumeJson: (resumeJson) => dispatch(setResumeJson(resumeJson)),
    }),
)(ResumeEditor);

export default ConnectedResumeEditor;
