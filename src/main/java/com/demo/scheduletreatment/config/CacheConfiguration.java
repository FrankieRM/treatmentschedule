package com.demo.scheduletreatment.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.demo.scheduletreatment.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Treatment.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Treatment.class.getName() + ".treatmentItems", jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.TreatmentItem.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.TreatmentItem.class.getName() + ".items", jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Item.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Schedule.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Schedule.class.getName() + ".appointmentStatusHistories", jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.AppointmentStatusHistory.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Patient.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Employee.class.getName() + ".specialties", jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Person.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Person.class.getName() + ".contacts", jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Contact.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Parameter.class.getName(), jcacheConfiguration);
            cm.createCache(com.demo.scheduletreatment.domain.Parameter.class.getName() + ".employees", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
