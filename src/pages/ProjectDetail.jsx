import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS, PROJECT_IMAGES, PROJECT_GALLERIES } from './Projects'
import { ROUTES } from '../utils/constants'
import './project-detail.css'
import PageCinematicHero from '../components/PageCinematicHero'

export default function ProjectDetail(){
  const {projectId}=useParams(); const {i18n}=useTranslation(); const ar=i18n.language==='ar';
  const index=Number(projectId)-1; const item=PROJECTS[ar?'ar':'en'][index];
  if(!item||index<0||index>=PROJECT_IMAGES.length) return <Navigate to={ROUTES.projects} replace />
  const [title,location,capacity,description]=item
  const gallery = PROJECT_GALLERIES[index + 1] || []
  const facts=ar?[['القطاع',index%3===0?'زراعي':index%3===1?'صناعي':'تجاري'],['نوع النظام',index%2===0?'هجين':'متصل بالشبكة'],['القدرة',capacity],['الموقع',location]]:[['Sector',index%3===0?'Agricultural':index%3===1?'Industrial':'Commercial'],['System type',index%2===0?'Hybrid':'Grid-tied'],['Capacity',capacity],['Location',location]]
  return <main className="project-detail"><PageCinematicHero eyebrow={(ar?'مشروع مختار':'Selected project') + ' · ' + String(index+1).padStart(2,'0')} title={title} subtitle={description} primaryLabel={ar?'اطلب مشروعًا مشابهًا':'Request a similar project'} primaryTo={ROUTES.contact} secondaryLabel={ar?'كل المشاريع':'All projects'} secondaryTo={ROUTES.projects} /><section id="page-content" className="project-detail__content">{gallery.length > 0 && <div className="project-detail__gallery">{gallery.map((src, galleryIndex) => <figure key={src} className={galleryIndex === 0 ? 'project-detail__gallery-main' : ''}><img src={src} alt={`${title} ${galleryIndex + 1}`} loading={galleryIndex === 0 ? 'eager' : 'lazy'} /><span>0{galleryIndex + 1}</span></figure>)}</div>}<div className="project-detail__facts">{facts.map(([label,value])=><div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><div className="project-detail__story"><span>{ar?'نطاق الحل':'Solution scope'}</span><h2>{ar?'من الدراسة الهندسية حتى التشغيل':'From engineering study to commissioning'}</h2><p>{ar?'يشمل التصور دراسة الأحمال والموقع، واختيار الألواح والمحولات المناسبة، وتصميم هياكل التثبيت والحمايات، ثم التركيب والاختبار وربط نظام المراقبة لضمان وضوح الأداء بعد التشغيل.':'The concept covers load and site assessment, selection of suitable panels and inverters, mounting and protection design, installation, testing, and monitoring setup for clear operational performance.'}</p><p className="project-detail__note">{ar?'هذا المشروع نموذج توضيحي للمحتوى ويمكن استبداله لاحقًا ببيانات مشروع منفذ فعليًا.':'This is an illustrative content example and can later be replaced with verified data from a completed project.'}</p><div><Link to={ROUTES.contact}>{ar?'اطلب دراسة مشروع مشابه':'Request a similar project study'}</Link><Link to={ROUTES.projects}>{ar?'العودة لجميع المشاريع':'Back to all projects'}</Link></div></div></section></main>
}


