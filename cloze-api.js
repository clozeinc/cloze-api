/**
 * Cloze API Client
 * A JavaScript client for the Cloze REST API
 * @version 1.0.0
 */

class Cloze
{
    /**
     * Create a new Cloze API client
     * @param {string} [apiKey] - The bearer token API key (when running in an iframe inside Cloze do not provide this)
     */
    constructor(apiKey)
    {
        this.apiKey = apiKey;
        this.backend = apiKey ? 'fetch' : 'postMessage';
        this.baseUrl = 'https://api.cloze.com';

        // Initialize API modules
        this.people = new PeopleAPI(this);
        this.projects = new ProjectsAPI(this);
        this.companies = new CompaniesAPI(this);
        this.team = new TeamAPI(this);
        this.timeline = new TimelineAPI(this);
        this.analytics = new AnalyticsAPI(this);
        this.account = new AccountAPI(this);
    }

    /**
     * Internal method to make API requests
     * @private
     */
    async _request(method, path, body = null, queryParams = {})
    {
        if(this.backend === 'fetch')
            return this._fetchRequest(method, path, body, queryParams);
        else if(this.backend === 'postMessage')
            return this._postMessageRequest(method, path, body, queryParams);
    }

    /**
     * Make request using fetch API
     * @private
     */
    async _fetchRequest(method, path, body, queryParams)
    {
        // Build URL with query parameters
        const url = new URL(path, this.baseUrl);

        // Add query parameters
        Object.keys(queryParams).forEach(key =>
        {
            if(queryParams[key] !== undefined && queryParams[key] !== null)
            {
                url.searchParams.append(key, queryParams[key]);
            }
        });

        const headers = {
            'Authorization': `Bearer ${ this.apiKey }`,
            'Content-Type': 'application/json'
        };

        const options = {
            method,
            headers
        };

        if(body && (method === 'POST' || method === 'PUT' || method === 'PATCH'))
        {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url.toString(), options);

        if(!response.ok)
        {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API request failed: ${ response.status } ${ response.statusText } - ${ JSON.stringify(errorData) }`);
        }

        return response.json();
    }

    /**
     * Make request using postMessage to parent window
     * @private
     */
    async _postMessageRequest(method, path, body, queryParams)
    {
        return new Promise((resolve, reject) =>
        {
            const requestId = `cloze-api-${ Date.now() }-${ Math.random() }`;

            const messageHandler = (event) =>
            {
                if(event.data && event.data.requestId === requestId)
                {
                    window.removeEventListener('message', messageHandler);

                    if(event.data.error)
                        reject(new Error(event.data.error));
                    else
                        resolve(event.data.response);
                }
            };

            window.addEventListener('message', messageHandler);

            // Send request to parent
            window.parent.postMessage({
                type: 'cloze-api',
                requestId,
                method,
                path,
                body,
                queryParams,
            }, '*');

            // Timeout after 30 seconds
            setTimeout(() =>
            {
                window.removeEventListener('message', messageHandler);
                reject(new Error('Request timeout'));
            }, 30000);
        });
    }
}

/**
 * People API
 */
class PeopleAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Find people matching query criteria
     */
    async find(params = {})
    {
        return this.client._request('GET', '/v1/people/find', null, params);
    }

    /**
     * Get a specific person by ID
     */
    async get(uniqueid, team = false)
    {
        return this.client._request('GET', `/v1/people/get`, null, { uniqueid, team });
    }

    /**
     * Create a new person
     */
    async create(personData)
    {
        return this.client._request('POST', '/v1/people/create', personData);
    }

    /**
     * Update a person
     */
    async update(personData)
    {
        return this.client._request('POST', `/v1/people/update`, personData);
    }

    /**
     * Delete a person
     */
    async delete(personId)
    {
        return this.client._request('DELETE', `/v1/people/delete`, null, { uniqueid, team });
    }

    /**
     * Get batch of people changes (feed API)
     */
    async feed(params = {})
    {
        return this.client._request('GET', '/v1/people/feed', null, params);
    }
}

/**
 * Projects API
 */
class ProjectsAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Find projects matching query criteria
     */
    async find(params = {})
    {
        return this.client._request('GET', '/v1/projects/find', null, params);
    }

    /**
     * Get a specific person by ID
     */
    async get(uniqueid, team = false)
    {
        return this.client._request('GET', `/v1/projects/get`, null, { uniqueid, team });
    }

    /**
     * Create a new person
     */
    async create(personData)
    {
        return this.client._request('POST', '/v1/projects/create', personData);
    }

    /**
     * Update a person
     */
    async update(personData)
    {
        return this.client._request('POST', `/v1/projects/update`, personData);
    }

    /**
     * Delete a person
     */
    async delete(personId)
    {
        return this.client._request('DELETE', `/v1/projects/delete`, null, { uniqueid, team });
    }

    /**
     * Get batch of projects changes (feed API)
     */
    async feed(params = {})
    {
        return this.client._request('GET', '/v1/people/feed', null, params);
    }
}

/**
 * Companies API
 */
class CompaniesAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Find companies matching query criteria
     */
    async find(params = {})
    {
        return this.client._request('GET', '/v1/companies/find', null, params);
    }

    /**
     * Get a specific person by ID
     */
    async get(uniqueid, team = false)
    {
        return this.client._request('GET', `/v1/companies/get`, null, { uniqueid, team });
    }

    /**
     * Create a new person
     */
    async create(personData)
    {
        return this.client._request('POST', '/v1/companies/create', personData);
    }

    /**
     * Update a person
     */
    async update(personData)
    {
        return this.client._request('POST', `/v1/companies/update`, personData);
    }

    /**
     * Delete a person
     */
    async delete(personId)
    {
        return this.client._request('DELETE', `/v1/companies/delete`, null, { uniqueid, team });
    }

    /**
     * Get batch of companies changes (feed API)
     */
    async feed(params = {})
    {
        return this.client._request('GET', '/v1/companies/feed', null, params);
    }
}

/**
 * Team API
 */
class TeamAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Get team members
     */
    async members(params = {})
    {
        return this.client._request('GET', '/v1/team/members/list', null, params);
    }

    /**
     * Get team roles
     */
    async roles()
    {
        return this.client._request('GET', '/v1/team/roles');
    }

    /**
     * Get team hierarchy nodes
     */
    async nodes()
    {
        return this.client._request('GET', '/v1/team/nodes');
    }

    /**
     * Update a team member
     */
    async updateMember(memberData)
    {
        return this.client._request('POST', `/v1/team/members/update`, memberData);
    }
}

/**
 * Timeline API
 */
class TimelineAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Create a content record
     */
    async createContent(contentData)
    {
        return this.client._request('POST', '/v1/timeline/content/create', contentData);
    }

    /**
     * Create a todo
     */
    async createTodo(todoData)
    {
        return this.client._request('POST', '/v1/timeline/todo/create', todoData);
    }

    /**
     * Create a communication record
     */
    async createCommunication(communicationData)
    {
        return this.client._request('POST', '/v1/timeline/communication/create', communicationData);
    }

    /**
     * Get email opens
     */
    async getOpens(from = undefined)
    {
        return this.client._request('GET', '/v1/messages/opens', null, { from });
    }
}

/**
 * Analytics API
 */
class AnalyticsAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Query team activity
     */
    async queryTeamActivity(queries)
    {
        return this.client._request('POST', '/v1/analytics/teamactivity', { queries });
    }

    /**
     * Update team activity
     */
    async updateTeamActivity(params = {})
    {
        return this.client._request('GET', '/v1/analytics/teamactivity/update', null, params);
    }

    /**
     * Query user activity
     */
    async queryUserActivity(queries)
    {
        return this.client._request('POST', '/v1/analytics/activity', { queries });
    }

    /**
     * Query for data about projects/deals that are active or in the pipeline
     */
    async queryProjectData(queries)
    {
        return this.client._request('POST', '/v1/analytics/projects', { queries });
    }

    /**
     * Query for data about projects/deals that are active or in the pipeline
     */
    async queryLeadQualificationData(queries)
    {
        return this.client._request('POST', '/v1/analytics/leads', { queries });
    }

    /**
     * Query for data about projects/deals that are active or in the pipeline
     */
    async queryFunnelData(queries)
    {
        return this.client._request('POST', '/v1/analytics/funnel', { queries });
    }
}

/**
 * Account API
 */
class AccountAPI
{
    constructor(client)
    {
        this.client = client;
    }

    /**
     * Get user profile
     */
    async getProfile()
    {
        return this.client._request('GET', '/v1/user/profile');
    }

    /**
     * Get custom fields
     */
    async getCustomFields(relationtype)
    {
        return this.client._request('GET', `/v1/user/fields`, null, { relationtype });
    }

    /**
     * Get views and audiences
     */
    async getViews()
    {
        return this.client._request('GET', '/v1/user/views');
    }

    /**
     * Get people and company stages
     */
    async getContactStages()
    {
        return this.client._request('GET', '/v1/user/stages/people');
    }

    /**
     * Get project stages
     */
    async getProjectStages()
    {
        return this.client._request('GET', '/v1/user/stages/projects');
    }

    /**
     * Get people and company segments
     */
    async getContactSegments()
    {
        return this.client._request('GET', '/v1/user/segments/people');
    }

    /**
     * Get project segments
     */
    async getProjectSegments()
    {
        return this.client._request('GET', '/v1/user/segments/projects');
    }

    /**
     * Get steps
     */
    async getSteps(segment = undefined, stage = undefined)
    {
        return this.client._request('GET', '/v1/account/steps', null, { segment, stage });
    }
}

// Export for different module systems
if(typeof module !== 'undefined' && module.exports)
{
    module.exports = Cloze;
}
if(typeof window !== 'undefined')
{
    window.Cloze = Cloze;
}
