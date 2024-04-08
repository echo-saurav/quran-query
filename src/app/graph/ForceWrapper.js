import dynamic from 'next/dynamic';

const ForceGraph3D = dynamic(() => import('react-force-graph').then(module => module.ForceGraph3D), { ssr: false });

function ForceGraphWrapper(props) {
    return <ForceGraph3D {...props}  />;
}

export default ForceGraphWrapper;
